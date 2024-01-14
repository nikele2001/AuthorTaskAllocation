module.exports = function (Author) {
  Author.validatesUniquenessOf('name', {
    message: 'name is not unique',
  });

  Author.observe('after delete', function (ctx, next) {
    if (ctx.where.id) {
      Author.app.models.Task.destroyAll(
        { authorId: ctx.where.id },
        function (err, info) {
          if (err) {
            console.log(err);
            next(err);
          } else {
            console.log(
              'Deleted all tasks associated with author id: ',
              ctx.where.id
            );
            next();
          }
        }
      );
    } else {
      next();
    }
  });

  /**
   * Create a new author
   * @param {*} author author object. For some reason, LoopBack seemingly doesn't parse the request body into an object, so we have to do it manually
   * @param {*} cb the callback function
   */
  Author.createAuthor = function (author, cb) {
    var name = author.name;
    Author.create({ name: name }, function (err, author) {
      if (err) cb(err);
      else cb(null, author);
    });
  };

  Author.remoteMethod('createAuthor', {
    accepts: {
      arg: 'name',
      type: 'string',
      required: true,
      http: { source: 'body' },
    },
    returns: { arg: 'author', type: 'object' },
    http: { verb: 'post' },
  });

  /**
   * Get all authors
   * @param {*} cb the callback function
   */
  Author.getAuthors = function (cb) {
    Author.find(function (err, authors) {
      if (err) cb(err);
      else cb(null, authors);
    });
  };

  Author.remoteMethod('getAuthors', {
    returns: { arg: 'authors', type: 'array' },
    http: { verb: 'get' },
  });

  /**
   * Get all authors with their respective task counts
   * @param {*} cb the callback function
   */
  Author.getAuthorsWithTaskCount = function (cb) {
    Author.find(function (err, authors) {
      if (err) cb(err);
      else {
        if (authors.length === 0) {
          cb(null, []);
          return;
        }
        var authorsWithTaskCount = [];
        var authorCount = authors.length;
        var authorsProcessed = 0;

        authors.forEach(function (author) {
          author.tasks(function (err, tasks) {
            if (err) cb(err);
            else {
              author.tasksCount = tasks.length;
              authorsWithTaskCount.push(author);
              authorsProcessed++;
              if (authorsProcessed === authorCount) {
                cb(null, authorsWithTaskCount);
              }
            }
          });
        });
      }
    });
  };

  Author.remoteMethod('getAuthorsWithTaskCount', {
    returns: { arg: 'authors', type: 'array' },
    http: { verb: 'get' },
  });

  /**
   * Get an author by ID
   * @param {*} id ID of the author to get
   * @param {*} cb the callback function
   */
  Author.getAuthor = function (id, cb) {
    Author.findById(id, function (err, author) {
      if (err) cb(err);
      else cb(null, author);
    });
  };

  Author.remoteMethod('getAuthor', {
    accepts: {
      arg: 'id',
      type: 'string',
      required: true,
      http: { source: 'body' },
    },
    returns: { arg: 'author', type: 'object' },
    http: { verb: 'get' },
  });

  /**
   * Get an author by name
   * @param {*} name name of the author to get
   * @param {*} cb the callback function
   */
  Author.getAuthorByName = function (name, cb) {
    Author.findOne({ where: { name: name } }, function (err, author) {
      if (err) cb(err);
      else cb(null, author);
    });
  };

  Author.remoteMethod('getAuthorByName', {
    accepts: {
      arg: 'name',
      type: 'string',
      required: true,
      http: { source: 'body' },
    },
    returns: { arg: 'author', type: 'object' },
    http: { verb: 'get' },
  });

  /**
   * Update an author
   * @param {*} author author object
   * @param {*} cb the callback function
   */
  Author.updateAuthor = function (data, cb) {
    var author = data.author;
    var id = author.id;
    var dataToUpdate = {};

    // Only allow the name to be updated
    dataToUpdate.name = author.name;

    Author.updateAll({ id: id }, dataToUpdate, function (err, author) {
      if (err) cb(err);
      else cb(null, author);
    });
  };

  Author.remoteMethod('updateAuthor', {
    accepts: {
      arg: 'author',
      type: 'object',
      required: true,
      http: { source: 'body' },
    },
    returns: { arg: 'author', type: 'object' },
    http: { verb: 'patch' }, // Change this line
  });

  /**
   * Delete an author
   * @param {number} id the ID of the author to delete
   * @param {*} cb the callback function
   */
  Author.deleteAuthor = function (id, cb) {
    Author.destroyById(id, function (err) {
      if (err) cb(err);
      else cb(null, { message: `Author deleted successfully` });
    });
  };

  Author.remoteMethod('deleteAuthor', {
    accepts: {
      arg: 'id',
      type: 'number',
      required: true,
      http: { source: 'path' },
    },
    returns: { arg: 'response', type: 'object' },
    http: { verb: 'delete' },
  });
};
