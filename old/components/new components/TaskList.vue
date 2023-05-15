<template>
    <section class="todos">
        <div class="title-bar">
            <h3>Opgaver</h3>

            <div>
                <p v-if="!showCustomTaskInput" @click="toggleCustomTask">Tilpasset opgave</p>

                <div v-else class="custom-task-input">
                    <input v-model="customTaskRef" type="text" placeholder="Indtast opgave">
                    <button @click="createCustomTask">Opret</button>

                    <p @click="toggleCustomTask">Luk</p>
                </div>
            </div>
        </div>

        <div class="section-bg">
            <div class="todo-categories-list">
                <div class="categories">
                    <div v-for="category in taskOptions" @click="switchCategory(category.id)"
                         :key="category.id" class="category"
                         :class="{selected: currentTaskCategory === category.id}">
                        <p>{{ category.name }}</p>
                        <small>{{ countSelectedTasksInCategory(category) }}</small>
                    </div>
                </div>
            </div>

            <div class="task-selection-grid">
                <div v-for="task in taskOptions.find(t => t.id === currentTaskCategory).tasks"
                     :key="task.id" class="task" :class="{ selected: taskIsSelected(task) }"
                     @click="toggleTask(task)">
                    <div class="checkbox">
                        <font-awesome-icon icon="check" :class="{invisible: !taskIsSelected(task)}"/>
                    </div>

                    <p>{{ task.name }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.todo-categories-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .categories {
    align-items: center;
    display: flex;
    gap: 1rem;

    .category {
      align-items: center;
      background-color: #fff;
      border-radius: var(--border-radius);
      cursor: pointer;
      display: flex;
      gap: 2rem;
      padding: var(--default-padding);

      &.selected {
        background-color: var(--muted);
        color: var(--text-secondary);
      }
    }
  }
}

.create-custom-todo {
  display: flex;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.125rem;
  cursor: pointer;
}

</style>