<template>
        <div @click="comingSoonDialogue"
                v-if="!customerOptions.filter(c => recursiveObjectSearch(c, customerSearchRef)).length">
            <p>Ingen kunder fundet. <span>Klik for at oprette en ny kunde.</span></p>
        </div>
</template>

