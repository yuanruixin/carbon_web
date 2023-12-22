<template>
  <section class="section-wrapper">
    <div class="title-continer">
      <TheIcon :icon="icon" class="icon" :width="68" :height="68"></TheIcon>
      <span class="title">{{ props.title }}</span>
    </div>
    <div class="main-content">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
import TheIcon from '@/common/TheIcon/TheIcon.vue';
const props = defineProps({
  icon: {
    default: 'target'
  },
  title: {
    default: "标题"
  }
})
</script>

<style lang="scss" scoped>
.section-wrapper {
  position: relative;

  .title-continer {
    position: absolute;
    top: 0;
    left: 50%;
    translate: -50% 0;
    width: max-content;
    padding: 20px;
    border-radius: 0 0 20px 20px;
    background: linear-gradient(45deg, #0E5CFE, #5094FB);

    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;

    .icon {
      width: 68px;
      height: 68px;
    }

    .title {
      font-size: 66px;
      color: #fff;
      font-weight: bold;
    }
  }

  .main-content {
    margin-top: 100px;
  }
}
</style>