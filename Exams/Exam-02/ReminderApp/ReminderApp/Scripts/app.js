/// <reference path="cron.js" />
ko.bindingHandlers.highlighter = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {

    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = valueAccessor();
        var valueUnwrapped = ko.toJSON(ko.unwrap(value));
        $(element).css('word-break', 'break-all');
        $(element).html(valueUnwrapped);
        hljs.highlightBlock(element);
    }
};

/* Your VM */
var MasterVm = function () {
    var self = this;
    self.data = ko.observable();
    self.data2 = ko.observable();

    //1. subscribe to data changes
    var vm = new cron.CronViewModel(), vm2= new cron.CronViewModel();
    vm.subscribeToChange(self.data).loadData({
        type: 'month',
        month: 'Jan',
        day: 14,
        hour: 9,
        minute: 20,
        ampm: 'PM'
    });

    vm2.subscribeToChange(self.data2);

    self.reset = function () {
        self.vm1().loadData({ type: 'week', month: 'Feb', day: 'Sunday', hour: 5, minute: 15, ampm: 'AM' });
    }

    self.reset2 = function () {
        self.vm2().loadData({ type: 'year', month: 'Feb', day: 12, hour: 5, minute: 15, ampm: 'AM' });
    }

    //2. initialize CronViewModel
    self.vm1 = ko.observable(vm);
    self.vm2 = ko.observable(vm2);
};

$(function () {
    var vm = new MasterVm();
    ko.applyBindings(vm);
});