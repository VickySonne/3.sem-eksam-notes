<script setup>
import ProductOverview from './ProductOverview.vue';
</script>


<template>
<div>
    <div>
        <div class="back-btn">
            <i>i</i>
            <p>Tilbage til sagsstyrring</p>
        </div>
        <div>
            <p>Kontakt</p>
            <p>Print</p>
            <p>Gem</p>
            <p>Handling</p>
        </div>
    </div>
    
    <div class="flex-wrapper">
        <div class="content-left">
            <section>
                <h3>Detajler</h3>
                <div>
                    <div>
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
                        <div>
                            <p class="tag">Tag 1</p>
                            <p class="tag">Tag 2</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h3>Opgaver</h3>
                <div>

                </div>
            </section>
            <section>
                <h3>Dokumenter</h3>
                <div>

                </div>
            </section>
            <ProductOverview />
        </div>

        <div class="content-right">
            <div>
                <h3>Kunde</h3>
                <div>

                </div>
            </div>
            <div>
                <h3>SMS Beskeder</h3>
                <div class="sms-container">

                    <div class="content-box">
                        <div class="text-box">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </div>
                        <p>Mon Apr 24 2023</p>
                    </div>

                    <div class="content-box">
                        <div class="text-box">
                            <p>Lorem</p>
                        </div>
                        <p>Mon Apr 24 2023</p>
                    </div>

                    <div class="send-msg">
                        <input type="search" placeholder="Søg på varer...">
                        <i>i</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
.flex-wrapper{
    display: flex;
    flex-direction: row;

    .content-left{
        width: 70%;
    }

    .content-right{
        width: 30%;
    }
}

.sms-container{
    background-color: rgb(229 231 235);
    height: 32rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: flex-end;

    .text-box{
        background-color: rgb(30 41 59);
        color: white;
        max-width: 75%;
        padding: 1rem;
    }

    .send-msg{
        width: 100%;
        background-color:  rgb(245 245 245);
        display: flex;
        align-self: center;
        padding: 1rem;
    }
    

}

</style>