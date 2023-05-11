<template>
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
                <input type="text" placeholder="Send en besked..." v-model="textMessagingRef">
                <font-awesome-icon icon="paper-plane" @click="sendTextMessage()"/>
            </div>
        </div>
</template>

<style lang="scss" scoped>
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
</style>