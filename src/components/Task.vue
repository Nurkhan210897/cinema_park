<template>
  <div class="wrapper">
    <div class="content-wrapper">
      <section>
        <div class="task_list_header">
          <h1 class="ui-title-1">Задачи</h1>
          <div class="buttons_list">
            <button
              class="button button--round button-default"
              @click="filter = 'active'"
              :class="{ actuveTab: filter === 'active' }"
            >
              Не просмотренные
            </button>
            <button
              class="button button--round button-default"
              @click="filter = 'completed'"
              :class="{ actuveTab: filter === 'completed' }"
            >
              Просмотренные
            </button>
            <button
              class="button button--round button-default"
              @click="filter = 'all'"
              :class="{ actuveTab: filter === 'all' }"
            >
              Все
            </button>
          </div>
        </div>
      </section>
      <div class="task_list">
        <div
          class="task_item"
          v-for="task in filteredTasks"
          :key="task.id"
          :class="{ completed: task.completed }"
        >
          <div class="ui-card ui-card--shadow">
            <div class="task_item_info">
              <div class="task_item_main_info">
                <span class="ui-label  ui-label--warning">{{
                  task.whatWatch
                }}</span>
                <span>Продолжительность: {{ task.time }}</span>
              </div>
              <span class="button-close"></span>
            </div>
            <div class="task_content">
              <div class="task_title">
                <div class="ui-checkbox-wrapper">
                  <input
                    class="ui-checkbox"
                    id="exampleCheckbox"
                    type="checkbox"
                    v-model="task.completed"
                  />
                </div>
                <h4>{{ task.title }}</h4>
              </div>
              <div class="task_deskription">
                <p>{{ task.description }}</p>
              </div>
            </div>
            <div class="tag_list">
              <div
                class="ui-tag__wrapper"
                v-for="(tag, index) in task.tags"
                :key="index"
              >
                <div class="ui-tag" :class="{ activeTag: tag.use }">
                  <span class="tag-title">{{ tag.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    filter: "active",
  }),
  computed: {
    ...mapGetters(["tasks"]),
    filteredTasks() {
      if (this.filter === "active") {
        return this.tasks.filter((task) => {
          return task.completed === false;
        });
      } else if (this.filter === "completed") {
        return this.tasks.filter((task) => {
          return task.completed;
        });
      } else if (this.filter === "all") {
        return this.tasks;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.actuveTab {
  background-color: #444ce0 !important;
  color: #ffffff;
}
.completed {
  opacity: 0.8;
  filter: blur(.8);
  h4,
  p {
    text-decoration: line-through;
  }
}
.task_item_info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.task_item {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .button-close {
    width: 20px;
    height: 20px;
  }

  .ui-label {
    margin-right: 20px;
    border-radius: 30px;
  }
  .task_title {
    display: flex;
    align-items: center;
    margin: 20px 0;
    .ui-checkbox-wrapper {
      margin-right: 10px;
    }
    h4 {
      font-weight: bold;
    }
  }
}
.tag_list {
  .ui-tag__wrapper {
    margin-right: 15px;
  }
}
.buttons_list {
  button {
    margin-right: 15px;
  }
}
.task_list_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
