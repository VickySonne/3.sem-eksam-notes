<script setup>
    import ProductOverview from '../components/ProductOverview.vue';
    import TodoListeComp from '../components/TodoListeComp.vue';
    import database from '../database.js';

    const props = defineProps(['id']);
    
    const { data } = await database
        .from('cases')
        .select('*, customer(*), created_by(*), responsible_employee(*), status(*), tags(*), tasks(*), files(*), notes(*)')
        .eq('id', props.id)
        .limit(1)
        .single();

    console.log(props.id)
    console.log(data);



    const creationDate = new Date(data.created_at);
    const pickupDate = new Date(data.pickup);
</script>


<template>
<div>
    <div class="menu-bar">
        <div class="back-btn">
            <i>i</i>
            <p>Tilbage til sagsstyrring</p>
        </div>

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
                        <p><span>Status:&nbsp;</span>{{ data.status.name }}</p>
                        <p><span>Ansvarlig:&nbsp;</span>{{ data.responsible_employee.name }}</p>
                        <p><span>Afhentningstidspunkt:&nbsp;</span>{{ new Intl.DateTimeFormat('da-DK').format(pickupDate) }}</p>
                        <p v-if="!data.negotiated_price==null"><span>Aftalt pris:&nbsp;</span>{{ data.negotiated_price }} kr.</p>
                        <p><span>Oprettet af:&nbsp;</span>{{ data.created_by.name }}</p>
                        <p><span>Oprettet d.&nbsp;</span>{{ new Intl.DateTimeFormat('da-DK').format(creationDate) }}</p>
                        <p v-if="!data.negotiated_price==null"><span>Beskrivelse:&nbsp;</span>{{ data.description }}</p>
                    </div>

                    <div v-if="data.tags.length">
                        <h4>Tags</h4>
                        <div class="tags">
                            <p class="tag" v-for="tag in data.tags" :key="tag.id">{{ tag.name }}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="title-bar">
                    <h3>Opgaver</h3>
                    <p>Ret opgaver</p>
                </div>

                <div class="section-bg todo-lists" v-if="data.tasks.length">
                    <div class="catagories">
                        <TodoListeComp v-for="workcase in data" :data="workcase" :key="workcase.id"/>
                    </div>
                    <div>
                        <i>i</i>
                        <p>Marker alle</p>
                    </div>
                </div>

                <div class="section-bg add-todo" v-else>
                    <i>i</i>
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
                            <th>Filer</th>
                        </thead>

                        <tbody v-if="data.files.length">
                            <td v-for="file in data.files" :key="file.id">{{ file.name }}</td>
                        </tbody>

                        <p v-else>Ingen filer</p>
                    </table>

                    <table>
                        <thead>
                            <th>Noter</th>
                        </thead>

                        <tbody v-if="data.notes.length">
                            <td v-for="note in data.notes" :key="note.id">{{ note.content }}</td>
                        </tbody>

                        <p v-else>Ingen noter</p>
                    </table>
                </div>
            </section>

            <ProductOverview />
        </div>

        <div class="content-right">
            <section>
                <div class="ret-kunde">
                    <h3>Kunde</h3>
                    <p>Ret kunde</p>
                </div>

                <div class="kunde-container">
                    <p class="first-flex">{{ data.customer.name }}<span>regular customers</span></p>
                    <p>{{ data.customer.address}}</p>
                    <p>{{ data.customer.zipcode }} {{ data.customer.city }}</p>
                    <p>{{ data.customer.phone }}</p>
                    <p>{{ data.customer.email }}</p>
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
                        <i>i</i>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>

// Vicky Styling start
    .title-bar{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        p{
            margin-right: 1rem;
            cursor: pointer;
        }

        p:hover{
            text-decoration: underline;
        }
    }

    h3{
        font-weight: 700;
        font-size: 1.125rem;
    }

    .back-btn{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        
        cursor: pointer;
        font-weight: 700;
    }
    .menu-bar{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 1rem;
        align-items: center;

        .tertiary-menu{
            display: flex;
            flex-direction: row;
            gap: 1rem;
            align-items: center;

            p{
                cursor: pointer;
            }

            p:hover{
                text-decoration: underline;
            }

            .action-btn{
                border: solid 1px transparent;
                border-radius: 0.125rem;
                background-color: aquamarine;
                padding: 1rem;
            }
        }
    }

    section{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .section-bg{
        background-color: rgb(229 231 235);
        padding: 1rem;
        border-radius: 0.125rem;
    }

    .two-columns{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        
        div{
            width: 50%;

            span{
                font-weight: 700;
            }

            h4{
                font-weight: 700;
                margin-bottom: 0.5rem;
            }

            .tags{
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                .tag{
                    background-color: rgb(30 41 59); 
                    color: white;
                    padding: 0.5rem;
                    border-radius: 0.125rem;
                }
            }
            
        }

        .details{
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }

    .todo-lists{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .catagories{
            max-width: 70%;
        }

        & > div{
            display: flex;
            flex-direction: row;
            gap: 1rem;
        }

    }

    .add-todo{
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .document-table{
        display: flex;

        table{
            width: 50%;

            th{
                font-weight: 500;
            }

            td{
                padding: 1rem 0;
            }
        }
    }


// Vicky Styling slut
    .flex-wrapper{
        display: flex;
        flex-direction: row;
        gap: 1rem;

        .content-left{
            width: 70%;
            display: flex;
            flex-direction: column;
            gap: 3rem;
        }

        .content-right{
            width: 30%;
            display: flex;
            flex-direction: column;
            gap: 3rem;
        }
    }
    .sms-container{
        background-color: rgb(229 231 235);
        height: 32rem;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: flex-end;
        border-radius: .125rem;

        .content-box{
            display: flex;
            flex-direction: column;
            align-items: end;
            margin: 1rem 0;
            gap: 0.5rem;
        }

        .text-box{
            background-color: rgb(30 41 59);
            color:  rgb(249 250 251);
            padding: 1rem;
            max-width: 75%;
            border-radius: .125rem;
        }

        
        .date{
            display: flex;
            align-content: flex-end;

            small{
                font-size: 0.8rem;
            }
        }

        .send-msg{
            width: 100%;
            background-color:  rgb(245 245 245);
            padding: 1rem;
            border-radius: .125rem;
            position: relative;

            i{
                position: absolute;
                right: 1rem;
            }
        }
        
    }

    .kunde-container{
        border-radius: .125rem;
        padding: 1rem;
        background-color: rgb(229 231 235);
        gap: 1rem;

        span{
            border-radius: .125rem;
            color: rgb(250 250 250);
            background-color: rgb(30 41 59); 
            padding: 0.5rem;
        }

        .first-flex{
            display: flex;
            align-items: center;
            gap: 1rem;
            font-weight: 600;
        }

        p{
            padding-bottom: 0.3rem;
        }

        .signature{
            font-weight: 700;
            margin-top: 1rem;
        }

        .signature:hover{
            text-decoration: underline;
        }

    }

    .ret-kunde{
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        p{
            cursor: pointer;
        }

        p:hover{
            text-decoration: underline;
        }
    }

</style>