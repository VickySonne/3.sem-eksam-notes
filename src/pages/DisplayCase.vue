<script setup>
// import ProductOverview from '../components/ProductOverview.vue';
// import TodoListeComp from '../components/TodoListeComp.vue';
import database from '../database.js';
import BackButton from "@/components/shared/BackButton.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {onMounted, onUpdated, ref} from "vue";
import supabase from "../database.js";

const props = defineProps(['id'])

const textMessagingRef = ref("")

const sendTextMessage = async () => {
    const message = textMessagingRef.value
    textMessagingRef.value = ""

    await supabase.from("messages").insert(
        {
            case_id: props.id,
            contents: message,
        }
    ).select().then(data => {
        messagesRef.value.push(data.data[0])
    })
}

const scrollMessagesContainerToBottom = () => {
    const messagesContainer = document.querySelector("#messagesContainer")
    messagesContainer.scrollTop = messagesContainer.scrollHeight
}

onMounted(() => {
    scrollMessagesContainerToBottom()
})

// fake it till you make it
// this is a "hack" to make the messages container scroll to the bottom when a new message is added
onUpdated(() => {
    scrollMessagesContainerToBottom()
})

const {data: workCase} = await database
    .from('cases')
    .select('*, customers(*), created_by(*), responsible_employee(*), status(*), tags(*), tasks(*), cases_tasks(*), files(*), notes(*), messages(*)')
    .eq('id', props.id)
    .limit(1)
    .single()

const messagesRef = ref(workCase.messages)

const {
    status,
    description,
    responsible_employee: responsibleEmployee,
    created_by: createdBy,
    negotiated_price: negotiatedPrice,
    tags,
    tasks,
    cases_tasks: casesTasks,
    files,
    notes,
    customers,
    created_at: createdAt,
    pickup,
} = workCase

tasks.map(task => {
    task.completed = casesTasks.find(t => t.task_id === task.id).completed
})

const tasksRef = ref(tasks)

const toggleTaskCompletion = async (task) => {
    task.completed = !task.completed

    await database
        .from('cases_tasks')
        .update({completed: task.completed})
        .eq('case_id', props.id)
        .eq('task_id', task.id)
}

const creationDate = new Date(createdAt)
const pickupDate = new Date(pickup)
</script>


<template>
    <div>
        <div class="menu-bar">
            <BackButton>Tilbage til sagsstyring</BackButton>

            <div class="tertiary-menu">
                <p>Kontakt</p>
                <p>Print</p>
                <p>Gem</p>
                <div class="action-btn">Handling</div>
            </div>
        </div>

        <div class="flex-wrapper">
            <div class="content-left">
                <section>
                    <div class="title-bar">
                        <h3>Detajler</h3>
<!--                        <p>Ret detaljer</p>-->
                    </div>

                    <div class="section-bg two-columns">
                        <div class="details">
                            <p>
                                <span>Status:</span>
                                {{ status.name }}
                            </p>

                            <p>
                                <span>Ansvarlig:</span>
                                {{ responsibleEmployee.name }}
                            </p>

                            <p>
                                <span>Afhentningstidspunkt:</span>
                                {{ new Intl.DateTimeFormat('da-DK').format(pickupDate) }}
                            </p>

                            <p v-if="negotiatedPrice">
                                <span>Aftalt pris:</span>
                                {{ negotiatedPrice }} kr.
                            </p>

                            <p>
                                <span>Oprettet af:</span>
                                {{ createdBy.name }}
                            </p>

                            <p>
                                <span>Oprettet d.</span>
                                {{ new Intl.DateTimeFormat('da-DK').format(creationDate) }}
                            </p>

                            <p v-if="description">
                                <span>Beskrivelse:</span>
                                {{ description }}
                            </p>
                        </div>

                        <div v-if="tags.length">
                            <h4>Tags</h4>
                            <div class="tags">
                                <p class="tag" v-for="tag in tags" :key="tag.id">{{ tag.name }}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div class="title-bar">
                        <h3>Opgaver</h3>
<!--                        <p>Ret opgaver</p>-->
                    </div>

                    <div class="section-bg task-selection-grid" v-if="tasks.length">
                        <div v-for="task in tasksRef"
                             :key="task.id" class="task" :class="{ selected: task.completed }" @click="toggleTaskCompletion(task)">
                            <div class="checkbox">
                                <font-awesome-icon icon="check" :class="{invisible: !task.completed}"/>
                            </div>

                            <p>{{ task.name }}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <div class="title-bar">
                        <h3>Dokumenter</h3>
<!--                        <p>Ret dokumenter</p>-->
                    </div>

                    <div class="section-bg document-table">
                        <table>
                            <thead>
                            <tr>
                                <th>Filer</th>
                            </tr>
                            </thead>

                            <tbody v-if="files.length">
                            <tr>
                                <td v-for="file in files" :key="file.id">{{ file.name }}</td>
                            </tr>
                            </tbody>

                            <tbody v-else>
                            <tr>
                                <td>Ingen filer</td>
                            </tr>
                            </tbody>
                        </table>

                        <table>
                            <thead>
                            <tr>
                                <th>Noter</th>
                            </tr>
                            </thead>

                            <tbody v-if="notes.length">
                            <tr>
                                <td v-for="note in notes" :key="note.id">{{ note.content }}</td>
                            </tr>
                            </tbody>

                            <tbody v-else>
                            <tr>
                                <td>Ingen noter</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

<!--                <ProductOverview/>-->
            </div>

            <div class="content-right">
                <section>
                    <div class="ret-kunde">
                        <h3>Kunde</h3>
<!--                        <p>Ret kunde</p>-->
                    </div>

                    <div class="kunde-container">
                        <p class="first-flex">{{ customers.name }}<span>regular customers</span></p>
                        <p>{{ customers.address }}</p>
                        <p>{{ customers.zipcode }} {{ customers.city }}</p>
                        <p>{{ customers.phone }}</p>
                        <p>{{ customers.email }}</p>
                        <p>Kundeenhed stelnummer: 123456789</p>
                        <button class="signature">Tilføj signatur</button>
                    </div>
                </section>

                <section>
                    <h3>SMS-beskeder</h3>
                    <div class="sms-container">
                        <div id="messagesContainer" class="messages-container">
                            <div v-if="!messagesRef.length" class="no-messages">
                                <p>Ingen beskeder sendt på denne sag.</p>
                            </div>

                            <div v-for="message in messagesRef" class="content-box" :key="message.id">
                                <div class="text-box">
                                    <p>{{ message.contents }}</p>
                                </div>

                                <div class="date">
                                    <small>{{ new Date(message.created_at).toLocaleString() }}</small>
                                </div>
                            </div>
                        </div>

                        <div class="send-msg">
                            <input type="search" placeholder="Send en besked..." v-model="textMessagingRef">
                            <font-awesome-icon icon="paper-plane" @click="sendTextMessage()"/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.invisible {
    visibility: hidden;
}

.no-messages {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    width: 100%;
}

.task-selection-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    .task {
        align-items: center;
        background-color: #fff;
        border-radius: var(--border-radius);
        cursor: pointer;
        display: flex;
        gap: 1rem;
        padding: var(--default-padding);

        &.selected {
            background-color: var(--bg-primary);
            color: var(--text-secondary);
        }

        .checkbox {
            align-items: center;
            border: 2px solid #ccc;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            padding: 0.25rem;

            svg {
                height: 1rem;
                width: 1rem;
            }
        }
    }
}

// Vicky Styling start
.title-bar {
  display: flex;
  justify-content: space-between;

  p {
    margin-right: 1rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

h3 {
  font-weight: 700;
  font-size: 1.125rem;
}

.menu-bar {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .tertiary-menu {
    align-items: center;
    display: flex;
    gap: 1rem;

    p {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .action-btn {
      background-color: var(--bg-primary);
      border-radius: var(--border-radius);
      color: var(--text-secondary);
      padding: var(--default-padding);
    }
  }
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-bg {
  background-color: rgb(229 231 235);
  border-radius: var(--border-radius);
  padding: 1rem;
}

.two-columns {
  display: flex;
  gap: 1rem;

  div {
    width: 50%;

    h4 {
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .tags {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .tag {
        background-color: var(--bg-primary);
        color: var(--text-secondary);
        padding: 0.5rem;
        border-radius: var(--border-radius)
      }
    }

  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p :first-child {
      font-weight: 600;
    }
  }
}

.todo-lists {
  display: flex;
  justify-content: space-between;

  .categories {
    max-width: 70%;
  }

  & > div {
    display: flex;
    gap: 1rem;
  }
}

.add-todo {
  align-items: center;
  display: flex;
  gap: 1rem;
}

.document-table {
  display: flex;

  table {
    width: 50%;

    th {
      font-weight: 500;
    }

    td {
      padding: 1rem 0;
    }
  }
}


// Vicky Styling slut
.flex-wrapper {
  display: flex;
  gap: 1rem;

  .content-left {
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .content-right {
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
}

.messages-container {
    height: 24rem;
    overflow-y: scroll;
    padding: var(--default-padding);
    width: 100%;
}

.sms-container {
    align-items: flex-end;
    background-color: rgb(229 231 235);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: var(--default-padding);

    .content-box {
        display: flex;
        flex-direction: column;
        align-items: end;
        margin: 1rem 0;
        gap: 0.5rem;
    }

    .text-box {
        background-color: var(--bg-primary);
        border-radius: var(--border-radius);
        color: var(--text-secondary);
        max-width: 75%;
        padding: var(--default-padding);
    }


    .date {
        align-content: flex-end;
        display: flex;

        small {
            font-size: 0.8rem;
        }
    }

    .send-msg {
        align-items: center;
        background-color: var(--text-secondary);
        border-radius: var(--border-radius);
        display: flex;
        padding: 1rem;
        width: 100%;

        :first-child {
            flex-grow: 1;
        }

        :last-child {
            cursor: pointer;
        }
    }

}

.kunde-container {
  border-radius: var(--border-radius);
  padding: var(--default-padding);
  background-color: rgb(229 231 235);
  gap: 1rem;

  span {
    background-color: var(--bg-primary);
    border-radius: var(--border-radius);
    color: var(--text-secondary);
    padding: 0.5rem;
  }

  .first-flex {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 600;
  }

  p {
    padding-bottom: 0.3rem;
  }

  .signature {
    font-weight: 700;
    margin-top: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
}

.ret-kunde {
  display: flex;
  justify-content: space-between;

  p {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}

</style>