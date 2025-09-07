<template>
  <li>
    <label class="todoList_label">
      <input
        class="todoList_input"
        type="checkbox"
        value="false"
        :checked="todo.status"
        @change="$emit('update:status', $event.target.checked)"
      />
      <span>{{ todo.content }}</span>
    </label>
    <a href="" @click.prevent="handleRomove(todo.id)">
      <i class="fa fa-times"></i>
    </a>
  </li>
</template>

<script setup>
const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['remove-todo'])
const handleRomove = (id) => {
  emit('remove-todo', id)
}
</script>
