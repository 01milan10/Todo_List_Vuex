import axios from "axios";

const state = {
  todos: [],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get("http://api-tut.test/api/articles/0");
    commit("setTodos", response.data.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post("http://api-tut.test/api/article", {
      title,
      completed: false,
    });
    commit("newTodo", response.data.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`http://api-tut.test/api/article/${id}`);

    commit("removeTodo", id);
  },
  async filterTodos({ commit }, e) {
    //? Why is the value of limit cant be accessed before the commit method is called.
    const limit = parseInt(
      e.target.options[e.target.options.selectedIndex].innerText
    );
    const response = await axios.get(
      `http://api-tut.test/api/articles/${limit}`
    );
    commit("setTodos", response.data.data);
  },
  async updateTodo({ commit }, updTodo) {
    const response = await axios.put(
      `http://api-tut.test/api/article/${updTodo.id}`,
      updTodo
    );
    console.log(updTodo.title);
    commit("updTodo", response.data.data);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
