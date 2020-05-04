module.exports = {
  ordenate(list) {
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length; j++) {
        const date_i = list[i].createdAt;
        const date_j = list[j].createdAt;

        if (date_i > date_j) {
          const aux = list[i];
          list[i] = list[j];
          list[j] = aux;
        }
      }
    }
  },
};
