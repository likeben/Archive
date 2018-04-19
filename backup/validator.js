validator(rule, value, callback) {
      if ((!isEdit || (isEdit && value !== record.value)) && dictionary.get(value)) {
        callback('字典的值不能重复');
      }
      callback();
    },