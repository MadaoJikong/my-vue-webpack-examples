<template>
  <div id="cjc">
    <input type="text" v-model="seen" />
    <p
      v-bind:seen="seen"
      v-bind="{ a1: 1, a2: 2 }"
      v-if="seen == 'true' ? true : false"
    >
      现在你看到我了
    </p>
    {{ rawHtml }}
    <span v-html="rawHtml"></span>
    <template>
      <div v-for="(item, index) in list" v-bind:key="item.id">
        {{ item }} ++ {{ index }}
      </div>
    </template>
    <div class="flex">我的第一个vue</div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      seen: true,
      rawHtml: "<h1>w</h1>",
      list: [
        { id: 1, name: "zs1" },
        { id: 2, name: "zs2" },
        { id: 3, name: "zs3" },
        { id: 4, name: "zs4" },
      ],
    };
  },
};
</script>