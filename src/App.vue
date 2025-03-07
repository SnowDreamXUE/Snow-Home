<template>
  <div class="app-container">
    <FlyingLines />
    <Header />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>


<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import FlyingLines from './components/FlyingLines.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    FlyingLines
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.main-content {
  flex: 1;
  position: relative;
  z-index: 2; /* 确保内容在Canvas上面 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
