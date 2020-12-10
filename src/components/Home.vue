<template>
  <div class="wrapper">
    <div class="content-wrapper">
      <section>
        <h1 class="ui-title-1">Home</h1>
        <div class="new_task">
          <form action="" @submit.prevent="">
            <input
              type="text"
              placeholder="Название фильма"
              v-model="newTask.title"
              @keyup.enter="newTaskPush"
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Описание фильма"
              v-model="newTask.description"
              @keyup.enter="newTaskPush"
            ></textarea>

            <div class="add_tags">
              <div class="ui-tag__wrapper" @click="addTagForm = !addTagForm">
                <div class="ui-tag" :class="{ activeTag: addTagForm }">
                  <span class="tag-title">Добавить тег</span
                  ><span class="button-close"></span>
                </div>
              </div>
              <div class="add_tag_form" v-if="addTagForm">
                <input type="text" v-model="newTag.title" />
                <button class="button button-success" @click="addTag">
                  Добавить +
                </button>
              </div>
            </div>
            <div class="tag_list">
              <div
                class="ui-tag__wrapper"
                v-for="(tag, index) in tags"
                :key="index"
              >
                <div
                  class="ui-tag"
                  @click="addTagUsed(tag)"
                  :class="{ activeTag: tag.use }"
                >
                  <span class="tag-title">{{ tag.title }}</span
                  ><span class="button-close"></span>
                </div>
              </div>
            </div>
            <div class="option_list">
              <div class="option">
                <input
                  type="radio"
                  class="what_watch_radio"
                  id="radioFilm"
                  value="Film"
                  v-model="newTask.whatWatch"
                />
                <label for="radioFilm">Фильм</label>
              </div>
              <div class="option">
                <input
                  type="radio"
                  class="what_watch_radio"
                  id="radioSerial"
                  value="Serial"
                  v-model="newTask.whatWatch"
                />
                <label for="radioSerial">Сериал</label>
              </div>
            </div>

            <div class="total_time">
              <div class="total_time" v-if="newTask.whatWatch === 'Film'">
                <span>Длительность фильма:</span>
                <div class="counted_time">
                  <p>{{ filmTime }}</p>
                </div>
              </div>
              <div class="total_time" v-if="newTask.whatWatch === 'Serial'">
                <span>Длительность сериала:</span>
                <div class="counted_time">
                  <p>{{ serialTime }}</p>
                </div>
              </div>
            </div>
            <div class="total_time_film" v-if="newTask.whatWatch === 'Film'">
              <div>
                <span>Час</span>
                <input
                  type="text"
                  class="time_input"
                  v-model="infoTask.filmHours"
                />
              </div>
              <div>
                <span>Минут</span>
                <input
                  type="text"
                  class="time_input"
                  v-model="infoTask.filmMinutes"
                />
              </div>
            </div>
            <div class="total_time_film" v-if="newTask.whatWatch === 'Serial'">
              <div>
                <span>Сезон</span>
                <input
                  type="text"
                  class="time_input"
                  v-model="infoTask.serialSeason"
                />
              </div>
              <div>
                <span>Серия</span>
                <input
                  type="text"
                  class="time_input"
                  v-model="infoTask.serialSeries"
                />
              </div>
              <div>
                <span>Минуты</span>
                <input
                  type="text"
                  class="time_input"
                  v-model="infoTask.serialMinutes"
                />
              </div>
            </div>
            <div class="submit_button">
              <button
                class="button button--round button-primary"
                @click.prevent="newTaskPush()"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    addTagForm: false,
    testModel: '',
    testText: '',
    removeText:'',
    newTag: {
      id: 3,
      title: "",
      use: false,
    },
    newTask: {
      id: 2,
      title: "",
      description: "",
      whatWatch: "",
      completed: false,
      editing: false,
    },
    infoTask: {
      filmHours: 1,
      filmMinutes: 30,
      serialSeason: 1,
      serialSeries: 11,
      serialMinutes: 40,
    },
    tagsUsed: [],
  }),
  methods: {
    addTag() {
      if (this.newTag.title === "") {
        return false;
      }
      const tag = {
        title: this.newTag.title,
        use: false,
      };
      this.$store.dispatch('NEW_TAG', tag)
    },
    newTaskPush() {
      if (this.newTask.title === "") {
        return false;
      }
      let time;
      if (this.newTask.whatWatch === "Film") {
        time = this.filmTime;
      } else {
        time = this.serialTime;
      }
      const task = {
        title: this.newTask.title,
        whatWatch: this.newTask.whatWatch,
        time,
        tags: this.tagsUsed,
        description: this.newTask.description,
        completed: this.newTask.completed,
        editing: this.newTask.editing,
      };
      this.$store.dispatch("NEW_TASK", task);
      console.log(task);
      // RESET
      this.newTask.title = "";
      this.newTask.description = "";

      for(let i = 0; i < this.tags.length; i++){
        this.tags[i].use = false
      }
    },

    addTagUsed(tag) {
      tag.use = !tag.use;
      if (tag.use) {
        this.tagsUsed.push(tag);
      } else {
        this.tagsUsed.filter((item, i, arr) => {
          if (item.title === tag.title) {
            arr.splice(i, 1);
          }
        });
      }
    },
    getHoursAndMinutes(minutes) {
      let hours = Math.trunc(minutes / 60);
      let min = minutes % 60;
      return hours + " часов " + min + " минут";
    },
  },
  computed: {
    tags() {
      return this.$store.getters.tags;
    },
    filmTime() {
      let min = this.infoTask.filmHours * 60 + this.infoTask.filmMinutes * 1;
      return this.getHoursAndMinutes(min);
    },
    serialTime() {
      let min =
        this.infoTask.serialSeason *
        this.infoTask.serialSeries *
        this.infoTask.serialMinutes;
      return this.getHoursAndMinutes(min);
    },
  },
};
</script>

<style lang="scss" scoped>
.activeTag {
  background-color: #444ce0 !important;
  color: #fff;
  .button-close {
    opacity: 1;
    transition: all 0.5s ease;
    transform: rotate(90deg);
  }
}
.ui-label {
  margin-right: 20px;
  border-radius: 30px;
}

.option_list {
  display: flex;
  align-items: center;
  .option {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }
  .what_watch_radio {
    margin-right: 12px;
    margin-bottom: 0;
    cursor: pointer;
  }
  label {
    margin-bottom: 0;
    cursor: pointer;
  }
}
.total_time {
  display: flex;
  align-items: center;
  margin-top: 15px;
  margin-bottom: 10px;
}
.total_time_film {
  margin-top: 20px;
  display: flex;
  div {
    margin-right: 20px;
  }
  span {
    display: block;
    margin-bottom: 15px;
    font-size: 14px;
    font-weight: 600;
  }
  .time_input {
    width: fit-content;
  }
  .counted_time {
    display: flex;
    align-items: center;
  }
}
.ui-tag__wrapper {
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
.ui-tag {
  transition: all 0.5s ease;
}
.add_tags {
  margin-bottom: 20px;
}
.add_tag_form {
  display: flex;
  align-items: center;
  margin: 0 0 15px 0;
  input {
    margin-bottom: 0;
    width: 85%;
    margin-right: 15px;
  }
}
.button-close:before,
.button-close:after {
  background: #fff;
}
.submit_button {
  text-align: right;
}
</style>
