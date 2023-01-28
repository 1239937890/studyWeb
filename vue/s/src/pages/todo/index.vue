<template>
  <div class="md:flex md:w-screen">
    <div
      class="hidden md:flex md:w-[200px] bg-zinc-200 border-r border-solid border-zinc-200 flex-col items-center gap-2"
    >
      <img :src="img_todo" class="h-[80px] mt-4" alt="" />
      <div
        class="bg-zinc-100 w-11/12 rounded leading-10 pl-3 hover:shadow duration-75 cursor-pointer text-zinc-700"
      >
        123
      </div>
    </div>
    <div class="p-2 bg-zinc-100 min-h-screen flex flex-col gap-3 flex-1">
      <div
        v-for="item of state.data"
        class="p-3 bg-white rounded drop-shadow border text-zinc-700 flex justify-between items-center"
      >
        <div>
          <div>{{ item.title }}</div>
          <div class="mt-2 text-xs text-zinc-500">{{ item.created_at }}</div>
          <div class="text-sm text-[12px]">{{ item.content }}</div>
        </div>
        <div @click="handleSetTodoState(item.id)">
          <div
            v-if="item.state"
            class="h-5 w-5 rounded border-solid bg-green-600 cursor-pointer duration-75 transition-all"
          ></div>
          <div
            v-else
            class="h-5 w-5 rounded border-solid border border-zinc-300 cursor-pointer hover:border-blue-300 duration-75 transition-all"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { api_todo_list, api_todo_set_state } from "@/api/todo";
import img_todo from "@/assets/images/logo.png";
import { reactive } from "vue";

const state: {
  data: Todo.DataStruct[];
} = reactive({
  data: [],
});

const doGet = () => {
  api_todo_list().then((res) => {
    state.data = res;
  });
};
doGet();

const handleSetTodoState = (id) => {
  api_todo_set_state(id).then((res) => {
    console.log(res);
    doGet();
  });
};
</script>
