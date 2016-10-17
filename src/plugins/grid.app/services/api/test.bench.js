suite('Array iteration', function() {
  benchmark('native forEach', function() {
    this.list.forEach(function(number) {
      return number;
    });
  });
}, {
  setup: function() {
    this.list = [5, 4, 3];
  },
  teardown: function() {
    this.list = null;
  }
});
