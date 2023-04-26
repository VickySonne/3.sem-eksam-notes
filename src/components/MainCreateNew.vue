<script async setup>
import TodoCatagoriDropdownComp from './TodoCatagoriDropdownComp.vue';
import ProductOverview from './ProductOverview.vue';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import router from "@/router";
</script>

<template>
    <div class="main-layout">
        <div class="main-left-content">
            <div class="back-btn" @click="router.push({ path: '/' })">
                <font-awesome-icon icon="arrow-left" />
                <p>Tilbage til sagsstyrring</p>
            </div>

            <div class="main-content">

                <section class="customer">
                    <h3>Kunde</h3>
                    <div class="search-bar">
                        <div class="search-field">
                            <i>i</i>
                            <input type="search" placeholder="Find kunde...">
                        </div>
                        <p>Opret Ny Kunde</p>
                        <div class="selected-customer">
                            <div>
                                <p>Kunde Navn <span>Kundegruppe</span></p>
                                <p>Telefon nummer</p>
                            </div>
                            <div>
                                <div>
                                    <p>Vejnavn</p>
                                    <p><span>Postnummer</span>&nbsp;<span>Bynavn</span></p>
                                </div>
                                <div>
                                    <i>x</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="todos">
                    <h3>Opgaver</h3>
                    <div class="todo-catagories-list section-bg">
                        <div class="catagories">
                            <TodoCatagoriDropdownComp />
                            <TodoCatagoriDropdownComp />
                            <TodoCatagoriDropdownComp />
                        </div>
                        <div class="create-custom-todo">
                            <i>i</i>
                            <p>Custom Opgave</p>
                        </div>
                    </div>
                </section>

                <section class="details">
                    <h3>Detaljer</h3>

                    <form class="grid-wrapper section-bg">
                        <div class="form-input">
                            <label for="">Ansvarlig</label>
                            <div class="input-field">
                                <p>Name</p>
                                <i>i</i>
                            </div>
                        </div>

                        <div class="form-input">
                            <label for="">Status</label>
                            <div class="input-field">
                                <p>Status</p>
                                <i>i</i>
                            </div>
                        </div>

                        <div class="form-input">
                            <label for="">Tags</label>
                            <div class="input-field">
                                <p>Tag</p>
                                <i>i</i>
                            </div>
                        </div>

                        <div class="flex-wrapper">
                            <div class="form-input">
                                <label for="">Afhentning</label>
                                <input class="input-field" type="datetime-local">
                            </div>
                            <div class="form-input">
                                <label for="">Aftalt Pris</label>
                                <div class="price-input">
                                    <input class="input-field" type="number" placeholder="Intern pris">
                                    <p>kr.</p>
                                </div>
                                
                            </div>
                        </div>

                        <div class="form-input description">
                            <label for="">Beskrivelse</label>
                            <textarea class="input-field" name="" id="" cols="30" rows="10"></textarea>
                        </div>
                    </form>
                </section>

                <section>
                    <ProductOverview />
                </section>

            </div>
        </div>

        <aside>
            
            <div class="section-bg">
                <h3>Opsummering</h3>
            </div>
            
            <div class="create-task">
                <i>i</i>
                <p>Opret Sag</p>
            </div>

        </aside>
    </div>

</template>

<style lang="scss" scoped>

    .main-layout{
        display: flex;
        flex-direction: row;

        .main-left-content{
            width: 70%;
        }

        aside{
            width: 100%;
            max-width: 30%;
            position: sticky;
            top: 0;
        }
    }
    .main-content{
        display: flex;
        flex-direction: column;
        gap: 3rem ;
    }

    h3{
        font-weight: 700;
        font-size: 1.125rem;
        margin-bottom: 1rem;
    }
    .back-btn{
        align-items: center;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        margin-bottom: 1rem;
        cursor: pointer;
        font-weight: 700;
    }

    .search-bar{
        display: flex;
        flex-direction: row;
        gap: 1rem;
        align-items: center;

        & > p{
                font-weight: 700;
                cursor: pointer;
        }

        & > p:hover{
            text-decoration: underline;
        }
    }

    .selected-customer{
        display: none;
    }

    .search-field{
            background-color: rgb(245 245 245);
            padding: 1rem 3rem;
            position: relative;

            i{
                position: absolute;
                left: 1rem;
                pointer-events: none;
            }

            input{
                cursor: text;
            }

            ::placeholder {
                color: grey;
                opacity: 1; /* Firefox */
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: grey;
            }

            ::-ms-input-placeholder { /* Microsoft Edge */
                color: grey;
            }
        }

        .section-bg{
            padding: 1rem;
            background-color: rgb(209 213 219);
            border-radius: 0.125rem;
        }

        .todo-catagories-list{
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .catagories{
                display: flex;
                gap: 1rem;
            }
        }

        .create-custom-todo{
            display: flex;
            flex-direction: row;
            gap: 1rem;
            background-color: white;
            padding: 1rem;
            border-radius: 0.125rem;
            cursor: pointer;
        }

        .grid-wrapper{
            display: grid;
            grid-template-columns: repeat(2,minmax(0,1fr));
            gap: 1rem;

            .form-input{
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                label{
                    font-weight: 600;
                }

                .input-field{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    background-color: white;
                    padding: 0.5rem;
                    border: 0 solid #e5e7eb;
                    border-radius: 0.125rem;
                }
            }

            .description{
                grid-column: span 2;
            }
        }

        .flex-wrapper{
            display: flex;
            flex-direction: row;
            gap: 1rem;

            & > div{
                width: 100%;
            }
        }

        .price-input{
            position: relative;

            input{
                width: 100%;
            }

            p{
                position: absolute;
                right: 0.5rem;
                bottom: 0.5rem;
                
            }   
        }

        .overflow{
            height: 750px;
            background-color: red;
        }
</style>