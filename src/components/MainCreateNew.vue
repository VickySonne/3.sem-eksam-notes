<script setup>
import TodoCatagoriDropdownComp from './TodoCatagoriDropdownComp.vue';
</script>

<template>

    <div>
        <i>i</i>
        <p>Tilbage til sagsstyrring</p>
    </div>

    <div>

        <section class="customer">
            <h3>Kunde</h3>
            <div>
                <div class="search-field">
                    <i>i</i>
                    <input type="search" placeholder="Find kunde...">
                </div>
                <p>Opret Ny Kunde</p>
                <div>
                    <div>
                        <div>
                            <p>Kunde Navn <span>Kundegruppe</span></p>
                        </div>
                        <p>Telefon nummer</p>
                    </div>
                    <div>
                        <div>
                            <p>Vejnavn</p>
                            <p><span>Postnummer</span><span>Bynavn</span></p>
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
            <div>
                <div>
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
            <form>
                <div>
                    <label for="">Ansvarlig</label>
                    <div>
                        <p>Name</p>
                        <i>i</i>
                    </div>
                </div>
                <div>
                    <label for="">Status</label>
                    <div>
                        <p>Status</p>
                        <i>i</i>
                    </div>
                </div>
                <div>
                    <label for="">Tags</label>
                    <div>
                        <ul>
                            <li>Tag 1</li>
                            <li>Tag 2</li>
                            <li>Tag 3</li>
                            <li>Tag 4</li>
                            <li>Tag 5</li>
                        </ul>
                        <i>i</i>
                    </div>
                </div>
                <div>
                    <div>
                        <label for="">Afhentning</label>
                        <input type="datetime-local">
                    </div>
                    <div>
                        <label for="">Aftalt Pris</label>
                        <input type="number" placeholder="kr.">
                    </div>
                </div>
                <div>
                    <label for="">Beskrivelse</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </form>
        </section>

        <section>
            Indsæt Vare component her
        </section>

    </div>

    <aside>

        <h3>Opsummering</h3>
        <div class="create-task">
            <i>i</i>
            <p>Opret Sag</p>
        </div>

    </aside>

</template>

<style lang="scss" scoped>

</style>