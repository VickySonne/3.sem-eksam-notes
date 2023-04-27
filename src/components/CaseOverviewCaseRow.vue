<script setup>
import router from "@/router";

const props = defineProps(['data']);

const {
    status,
    responsible_employee: responsibleEmployee,
    customer,
    tasks,
    tags,
    description,
    created_at: createdAt,
    pickup,
} = {...props.data}

const creationDate = new Date(createdAt);
const pickupDate = new Date(pickup);
</script>

<template>
    <tr @click="router.push({ path: '/case/' + data.id })">
        <td>{{ new Intl.DateTimeFormat('da-DK').format(creationDate) }}</td>

        <td>{{ status.name }}</td>

        <td>{{ responsibleEmployee.name }}</td>

        <td>{{ new Intl.DateTimeFormat('da-DK').format(pickupDate) }}</td>

        <td>{{ customer.name }}</td>

        <td>
            <p class="tag" v-for="task in tasks" :key="task.id">{{ task.name }}</p>
            <span v-if="!tasks.length">---</span>
        </td>

        <td>
            {{ description }}
            <span v-if="description==null">---</span>
        </td>

        <td>
            <p class="tag" v-for="tag in tags" :key="tag.id">{{ tag.name }}</p>
            <span v-if="!tags.length">---</span>
        </td>

        <td>
            kr.
        </td>

        <td>
            <button>Handling</button>
        </td>
    </tr>
</template>

<style lang="scss" scoped>
tr {
  cursor: pointer;

  &:nth-child(odd) {
    background-color: rgb(209 213 219);
  }

  td {
    padding: var(--default-padding);
    vertical-align: middle;

    &:last-child {
      text-align: right;
    }

    p {
      padding: 0.5rem;
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
  padding: 0.5rem;
  margin: 0.25rem;
  border-radius: var(--border-radius);
}
</style>