<script setup>
import ProductOverview from './ProductOverview.vue';
import TodoListeComp from './TodoListeComp.vue';
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
                        <p><span>Status:&nbsp;</span>Status</p>
                        <p><span>Ansvarlig:&nbsp;</span>Navn</p>
                        <p><span>Afhentningstidspunkt:&nbsp;</span>Dato</p>
                        <p><span>Aftalt pris:&nbsp;</span>xxx kr.</p>
                        <p><span>Oprettet af:&nbsp;</span>Navn</p>
                        <p><span>Oprettet d.&nbsp;</span>Dato</p>
                        <p><span>Beskrivelse:&nbsp;</span>Text</p>
                    </div>
                    <div>
                        <h4>Tags</h4>
                        <div class="tags">
                            <p class="tag">Tag 1</p>
                            <p class="tag">Tag 2</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="title-bar">
                    <h3>Opgaver</h3>
                    <p>Ret opgaver</p>
                </div>
                <div class="section-bg todo-lists">
                    <div class="catagories">
                        <TodoListeComp />
                        <TodoListeComp />
                        <TodoListeComp />
                    </div>
                    <div>
                        <i>i</i>
                        <p>Marker alle</p>    
                    </div>
                </div>
            </section>
            <section>
                <div class="title-bar">
                    <h3>Dokumenter</h3>
                    <p>Ret dokumenter</p>
                </div>
                <div class="section-bg">

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
                    <p class="first-flex">Hans Wurst <span>regular customers</span></p>
                    <p>Hansvej 1</p>
                    <p>1234 Hansby</p>
                    <p>31 53 67 37</p>
                    <p>hans@example.com</p>
                    <p>Kundeenhed Stelnummer</p>
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