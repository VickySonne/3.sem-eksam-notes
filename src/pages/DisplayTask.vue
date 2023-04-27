<script setup>
import ProductOverview from '../components/ProductOverview.vue';
import TodoListeComp from '../components/TodoListeComp.vue';
import database from '../database.js';
import BackButton from "@/components/shared/BackButton.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const props = defineProps(['id']);

const {data: workCase} = await database
    .from('cases')
    .select('*, customer(*), created_by(*), responsible_employee(*), status(*), tags(*), tasks(*), files(*), notes(*)')
    .eq('id', props.id)
    .limit(1)
    .single();

const {
    status,
    description,
    responsible_employee: responsibleEmployee,
    created_by: createdBy,
    negotiated_price: negotiatedPrice,
    tags,
    tasks,
    files,
    notes,
    customer,
    created_at: createdAt,
    pickup,
} = {...workCase}

const creationDate = new Date(createdAt);
const pickupDate = new Date(pickup);
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
                        <p>Ret detaljer</p>
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

                            <p v-if="!negotiatedPrice==null">
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

                            <p v-if="!description==null">
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
                        <p>Ret opgaver</p>
                    </div>

                    <div class="section-bg todo-lists" v-if="tasks.length">
                        <div class="categories">
                            <TodoListeComp v-for="task in tasks" :data="task" :key="task.id"/>
                        </div>

                        <div>
                            <i>i</i>
                            <p>Marker alle</p>
                        </div>
                    </div>

                    <div class="section-bg add-todo" v-else>
                        <font-awesome-icon icon="plus"/>
                        <p>tilføj opgaver</p>
                    </div>
                </section>

                <section>
                    <div class="title-bar">
                        <h3>Dokumenter</h3>
                        <p>Ret dokumenter</p>
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

                <ProductOverview/>
            </div>

            <div class="content-right">
                <section>
                    <div class="ret-kunde">
                        <h3>Kunde</h3>
                        <p>Ret kunde</p>
                    </div>

                    <div class="kunde-container">
                        <p class="first-flex">{{ customer.name }}<span>regular customers</span></p>
                        <p>{{ customer.address }}</p>
                        <p>{{ customer.zipcode }} {{ customer.city }}</p>
                        <p>{{ customer.phone }}</p>
                        <p>{{ customer.email }}</p>
                        <p>Kundeenhed stelnummer: 123456789</p>
                        <button class="signature">Tilføj signatur</button>
                    </div>
                </section>

                <section>
                    <h3>SMS-beskeder</h3>
                    <div class="sms-container">
                        <div class="content-box">
                            <div class="text-box">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>

                            <div class="date">
                                <small>Mon Apr 24 2023</small>
                            </div>
                        </div>

                        <div class="content-box">
                            <div class="text-box">
                                <p>Lorem</p>
                            </div>

                            <div class="date">
                                <small>Mon Apr 24 2023</small>
                            </div>
                        </div>

                        <div class="send-msg">
                            <input type="search" placeholder="Send en besked...">
                            <font-awesome-icon icon="paper-plane"/>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

// Vicky Styling start
.title-bar {
  display: flex;
  flex-direction: row;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;

  .tertiary-menu {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;

    p {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .action-btn {
      border: solid 1px transparent;
      border-radius: 0.125rem;
      background-color: aquamarine;
      padding: 1rem;
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
  padding: 1rem;
  border-radius: 0.125rem;
}

.two-columns {
  display: flex;
  flex-direction: row;
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
        background-color: rgb(30 41 59);
        color: white;
        padding: 0.5rem;
        border-radius: 0.125rem;
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
  flex-direction: row;
  justify-content: space-between;

  .categories {
    max-width: 70%;
  }

  & > div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
}

.add-todo {
  align-items: center;
  display: flex;
  flex-direction: row;
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
  flex-direction: row;
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

.sms-container {
  background-color: rgb(229 231 235);
  height: 32rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;
  border-radius: .125rem;

  .content-box {
    display: flex;
    flex-direction: column;
    align-items: end;
    margin: 1rem 0;
    gap: 0.5rem;
  }

  .text-box {
    background-color: rgb(30 41 59);
    color: rgb(249 250 251);
    padding: 1rem;
    max-width: 75%;
    border-radius: .125rem;
  }


  .date {
    display: flex;
    align-content: flex-end;

    small {
      font-size: 0.8rem;
    }
  }

  .send-msg {
    align-items: center;
    background-color: rgb(245 245 245);
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
  border-radius: .125rem;
  padding: 1rem;
  background-color: rgb(229 231 235);
  gap: 1rem;

  span {
    border-radius: .125rem;
    color: rgb(250 250 250);
    background-color: rgb(30 41 59);
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
  }

  .signature:hover {
    text-decoration: underline;
  }

}

.ret-kunde {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    cursor: pointer;
  }

  p:hover {
    text-decoration: underline;
  }
}

</style>