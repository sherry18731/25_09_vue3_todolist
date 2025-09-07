<template>
  <div class="todoList_list">
    <ul class="todoList_tab">
      <li>
        <a
          href="#"
          @click.prevent="filterStatus = 'all'"
          :class="{ active: filterStatus === 'all' }"
          >全部</a
        >
      </li>
      <li>
        <a
          href="#"
          @click.prevent="filterStatus = 'incomplete'"
          :class="{ active: filterStatus === 'incomplete' }"
          >待完成</a
        >
      </li>
      <li>
        <a
          href="#"
          @click.prevent="filterStatus = 'completed'"
          :class="{ active: filterStatus === 'completed' }"
          >已完成</a
        >
      </li>
    </ul>

    <div class="todoList_items">
      <ul class="todoList_item">
        <TodoItem
          v-for="todo in filterTodos"
          :key="todo.id"
          :todo="todo"
          v-model:status="todo.status"
          @remove-todo="emit('remove-todo', $event)"
        ></TodoItem>
      </ul>
      <div class="todoList_statistics">
        <p>還有 {{ incompleteCount }} 個待完成項目</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TodoItem from '@/components/TodoItem.vue'

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['remove-todo'])

const filterStatus = ref('all')
// 依照 filterStatus 來篩選 todos
const filterTodos = computed(() => {
  switch (filterStatus.value) {
    case 'completed':
      return props.todos.filter((todo) => todo.status)
    case 'incomplete':
      return props.todos.filter((todo) => !todo.status)
    default:
      return props.todos
  }
})
const incompleteCount = computed(() => {
  return props.todos.filter((todo) => !todo.status).length
})
</script>
