<script setup>
import router from "@/router";
import {ref} from "vue";
import CustomSelect from "@/components/shared/forms/CustomSelect.vue";
import CustomSelectItem from "@/components/shared/forms/CustomSelectItem.vue";

const props = defineProps(['data']);

const {
    status,
    responsible_employee: responsibleEmployee,
    customers,
    tasks,
    tags,
    description,
    created_at: createdAt,
    pickup,
    price
} = props.data

const creationDate = new Date(createdAt);
const pickupDate = new Date(pickup);

const expandedDescription = ref(false);
</script>

<template>
    <tr @click="router.push({ path: '/case/' + data.id })">
        
        <td>{{ new Intl.DateTimeFormat('da-DK').format(creationDate) }}</td>

        <td>{{ status.name }}</td>

        <td>{{ responsibleEmployee.name }}</td>

        <td>{{ new Intl.DateTimeFormat('da-DK').format(pickupDate) }}</td>

        <td v-if="customers">
            {{ customers.name }}
        </td>

        <td v-else>
            -
        </td>

        <td>
            <p class="tag" v-for="task in tasks" :key="task.id">{{ task.name }}</p>
            <span v-if="!tasks.length">-</span>
        </td>

        <td class="description-container" :class="{expandable: description !== null && description.length > 20}" @click.stop="expandedDescription = !expandedDescription">
            <p :class="{expanded: expandedDescription}">
                {{ description }}
            </p>

            <span v-if="!description">-</span>
        </td>

        <td>
            <p class="tag" v-for="tag in tags" :key="tag.id">{{ tag.name }}</p>
            <span v-if="!tags.length">-</span>
        </td>

        <td class="price-container">
            {{ price }}
            <p v-if="price">kr.</p>
            <p v-else>-</p>
        </td>

        <td @click.stop>
            <CustomSelect>
                <CustomSelectItem value="0">Handlinger</CustomSelectItem>
                <CustomSelectItem value="0">Meld klar</CustomSelectItem>
                <CustomSelectItem value="0">Something</CustomSelectItem>
                <CustomSelectItem value="0">Another thing</CustomSelectItem>
            </CustomSelect>
        </td>
    </tr>
</template>

<style lang="scss" scoped>
.price-container {
    align-items: center;
    display: flex;
}

.description-container {
    cursor: pointer;
    max-width: 20ch;

    &.expandable:hover {
        background-color: var(--bg-primary);
        color: var(--text-secondary);
    }

    p:not(.expanded) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

tr {
  cursor: pointer;

  &:nth-child(odd) {
    background-color: rgb(209 213 219);
  }

  td {
    padding: var(--default-padding);

    &:last-child {
      text-align: right;
    }

    button {
      background-color: var(--bg-primary);
      border-radius: var(--border-radius);
      color: var(--text-secondary);
      padding: var(--default-padding)
    }
  }
}


.tag {
  background-color: #e5e7eb;
    display: inline-block;
  padding: 0.5rem;
  margin: 0.25rem;
  border-radius: var(--border-radius);
}
</style>