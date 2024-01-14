module.exports = function (Task) {
  // Define any custom methods or hooks here

  // Example: a method to set the status of a task to 'done'
  Task.prototype.markAsDone = function (callback) {
    this.status = 'done';
    this.save(callback);
  };

  // Example: a remote method (exposed via REST) to mark a task as done
  Task.remoteMethod('markAsDone', {
    description: 'Mark this task as done',
    http: { path: '/markAsDone', verb: 'post' },
    returns: { arg: 'status', type: 'string' },
  });

  /**
   * Create a new task
   * @param {*} task task object. For some reason, LoopBack seemingly doesn't parse the request body into an object, so we have to do it manually
   * @param {*} cb the callback function
   */
  Task.createTask = function (task, cb) {
    var title = task.title;
    var description = task.description;
    var status = task.status;
    var dueDate = task.dueDate.substring(0, 10);
    var authorId = task.authorId;
    Task.create(
      {
        title: title,
        description: description,
        status: status,
        dueDate: dueDate,
        authorId: authorId,
      },
      function (err, task) {
        if (err) cb(err);
        else cb(null, task);
      }
    );
  };

  Task.remoteMethod('createTask', {
    accepts: {
      arg: 'task',
      type: 'object',
      required: true,
      http: { source: 'body' },
    },
    returns: { arg: 'task', type: 'object' },
    http: { verb: 'post' },
  });

  /**
   * Get all tasks
   * @param {*} cb the callback function
   */
  Task.getTasks = function (cb) {
    Task.find(function (err, tasks) {
      if (err) cb(err);
      else cb(null, tasks);
    });
  };

  Task.remoteMethod('getTasks', {
    returns: { arg: 'tasks', type: 'array' },
    http: { verb: 'get' },
  });

  /**
   * Get a task by ID
   * @param {*} id ID of the task to get
   * @param {*} cb the callback function
   */
  Task.getTask = function (id, cb) {
    Task.findById(id, function (err, task) {
      if (err) cb(err);
      else cb(null, task);
    });
  };

  Task.remoteMethod('getTask', {
    accepts: {
      arg: 'id',
      type: 'string',
      required: true,
      http: { source: 'body' },
    },
    returns: { arg: 'task', type: 'object' },
    http: { verb: 'get' },
  });

  /**
   * Get tasks by author ID
   * @param {*} author object containing the ID of the author to get tasks for. For some reason, LoopBack seemingly doesn't parse the request body into an object, so we have to do it manually
   * @param {*} cb the callback function
   */
  Task.getTasksByAuthorId = function (authorId, cb) {
    Task.app.models.Author.findById(authorId, function (err, author) {
      if (err) {
        cb(err);
      } else if (author === null) {
        cb(new Error('Author not found'));
      } else {
        Task.find({ where: { authorId: authorId } }, function (err, tasks) {
          if (err) cb(err);
          else
            cb(null, {
              id: authorId,
              name: author.name,
              tasks: tasks,
            });
        });
      }
    });
  };

  Task.remoteMethod('getTasksByAuthorId', {
    accepts: {
      arg: 'authorId',
      type: 'string',
      required: true,
      http: { source: 'query' },
    },
    returns: { arg: 'data', type: 'array' },
    http: { verb: 'get' },
  });

  /**
   * Update a task
   * @param {*} task task object
   * @param {*} cb the callback function
   */
  Task.updateTask = function (task, cb) {
    var id = task.id;
    var dataToUpdate = {};

    if (task.title !== undefined) {
      dataToUpdate.title = task.title;
    }

    if (task.description !== undefined) {
      dataToUpdate.description = task.description;
    }

    if (task.status !== undefined) {
      dataToUpdate.status = task.status;
    }

    if (task.dueDate !== undefined) {
      dataToUpdate.dueDate = task.dueDate.substring(0, 10);
    }

    if (task.authorId !== undefined) {
      dataToUpdate.authorId = task.authorId;
    }

    Task.updateAll({ id: id }, dataToUpdate, function (err, task) {
      if (err) cb(err);
      else cb(null, task);
    });
  };

  Task.remoteMethod('updateTask', {
    accepts: {
      arg: 'task',
      type: 'object',
      required: true,
      http: { source: 'body' },
    },
    returns: { arg: 'task', type: 'object' },
    http: { verb: 'patch' },
  });

  /**
   * Delete a task
   * @param {*} id the ID of the task to delete
   * @param {*} cb the callback function
   */
  Task.deleteTask = function (id, cb) {
    Task.destroyById(id, function (err, task) {
      if (err) cb(err);
      else cb(null, task);
    });
  };

  Task.remoteMethod('deleteTask', {
    accepts: {
      arg: 'id',
      type: 'string',
      required: true,
      http: { source: 'path' },
    },
    returns: { arg: 'task', type: 'object' },
    http: { verb: 'delete' },
  });
};
