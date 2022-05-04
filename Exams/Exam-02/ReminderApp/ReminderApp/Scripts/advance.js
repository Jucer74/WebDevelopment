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

var cron = (function () {
    var minutes = ko.utils.range(0, 59);
    var hours = ko.utils.range(0, 23);
    var weeks = [
        { text: "Primer", val: 1 },
        { text: "Segundo", val: 2 },
        { text: "Tercer", val: 3 },
        { text: "Cuarto", val: 4 }
    ];
    var months = [
        { text: "Enero", val: 1 },
        { text: "Febrero", val: 2 },
        { text: "Marzo", val: 3 },
        { text: "Abril", val: 4 },
        { text: "Mayo", val: 5 },
        { text: "Junio", val: 6 },
        { text: "Julio", val: 7 },
        { text: "Agosto", val: 8 },
        { text: "Septiembre", val: 9 },
        { text: "Octubre", val: 10 },
        { text: "Noviembre", val: 11 },
        { text: "Deciembre", val: 12 }
    ];

    var days = [
        { text: "Domingo", val: 7 },
        { text: "Lunes", val: 1 },
        { text: "Martes", val: 2 },
        { text: "Miercoles", val: 3 },
        { text: "Jueves", val: 4 },
        { text: "Viernes", val: 5 },
        { text: "Sabado", val: 6 }
    ];

    var option = function (id, name, selected) {
        var self = this;
        self.id = id;
        self.name = name;
        self.isSelected = ko.observable(selected || false);
        self.active = ko.pureComputed(function () {
            return self.isSelected() ? "active" : "zzz";
        }, self);
    };

    var tabs = [
        new option(1),
        new option(2),
        new option(3),
        new option(4, "Weekly"),
        new option(5, "Monthly"),
        new option(6, "Yearly")
    ];

    var types = {
         4: 'weekly', 5: 'monthly', 6: 'yearly'
    };

    var weekModel = function (data) {
        data = data || {};
        var self = this;
        self.id = data.id || 4;
        self.availableDays = ko.observableArray(days);
        self.minutes = minutes;
        self.hours = hours;
        self.days = ko.observableArray(data.days || []);
        self.hour = ko.observable(data.hour || 0);
        self.minute = ko.observable(data.minute || 0);

        var cron = ko.pureComputed(function() {
            return "0 " + self.minute() + " " + self.hour() + " ? * " + self.days().join() + " *";
        });

        self.toJS = function () {
            return {
                days:self.days().sort(),
                hour: self.hour(),
                minute: self.minute(),
                cron: cron()
            };
        }
    };

    var monthModel = function (data) {
        data = data || {};
        var self = this;
        self.id = data.id || 5;
        self.availableDays = ko.observableArray(days);
        self.minutes = minutes;
        self.hours = hours;
        self.weeks = weeks;

        self.isRecurring = ko.observable(data.isRecurring || "1");
        self.day = ko.observable(data.day || 1);
        self.month = ko.observable(data.month || 1);

        self.nday = ko.observable(data.nday || 1);
        self.nweek = ko.observable(data.nweek || 1);
        self.nmonth = ko.observable(data.nmonth || 1);

        self.hour = ko.observable(data.hour || 0);
        self.minute = ko.observable(data.minute || 0);

        var cron = ko.pureComputed(function () {
            return self.isRecurring() === "1" ?
                "0 " + self.minute() + " " + self.hour()+" " + self.day() + " 1/" + self.month() + " ? *"
            : "0 " + self.minute() + " " + self.hour() + " ? 1/" +
                self.nmonth()+" "+ self.nday() + "#" + self.nweek() + " *";
        });

        self.toJS = function () {
            return {
                isRecurring: self.isRecurring(),
                day: self.day(),
                month: self.month(),
                nday: self.nday(),
                nweek: self.nweek(),
                nmonth:self.nmonth(),
                hour: self.hour(),
                minute: self.minute(),
                cron:cron()
            };
        }
    };

    var yearModel = function (data) {
        data = data || {};
        var self = this;
        self.id = data.id || 5;
        self.availableDays = ko.observableArray(days);
        self.availableMonths = ko.observableArray(months);
        self.minutes = minutes;
        self.hours = hours;
        self.weeks = weeks;

        self.isRecurring = ko.observable(data.isRecurring || "1");
        self.day = ko.observable(data.day || 1);
        self.month = ko.observable(data.month || 1);

        self.nday = ko.observable(data.nday || 1);
        self.nweek = ko.observable(data.nweek || 1);
        self.nmonth = ko.observable(data.nmonth || 1);

        self.hour = ko.observable(data.hour || 0);
        self.minute = ko.observable(data.minute || 0);

        var cron = ko.pureComputed(function () {
            return self.isRecurring() === "1" ?
                "0 " + self.minute() + " " + self.hour() + " " + self.day()+" "+self.month() + " ? *"
            : "0 " + self.minute() + " " + self.hour() + " ? " +
                self.nmonth() + " " + self.nday() + "#" + self.nweek() + " *";
        });

        self.toJS = function () {
            return {
                isRecurring: self.isRecurring(),
                day: parseInt(self.day()),
                month: self.month(),
                nday: self.nday(),
                nweek: self.nweek(),
                nmonth: self.nmonth(),
                hour: self.hour(),
                minute: self.minute(),
                cron: cron()
            };
        }
    };

    var templateModel = function (key, data) {
        this.key = key;
        this.template = ko.observable(types[key]);
        this.data = data;
    };

    function getModel(key, data) {
        if (key === 4) return new weekModel(data);
        else if (key === 5) return new monthModel(data, true);
        else if (key === 6) return new yearModel(data);
        else return new weekModel(data);
    }

    var cv = function (data) {
        var self = this;
        self.tabs = ko.observableArray(tabs),
        self.templateData = ko.observable(),
        self.selectedTab = ko.observable();
        self.selectTab = function (tab) {
            if (self.selectedTab().id !== tab.id) {
                ko.utils.arrayForEach(self.tabs(), function (item) {
                    item.isSelected(item.id === tab.id);
                });

                self.selectedTab(tab);
                self.templateData(new templateModel(tab.id, getModel(tab.id)));
            }
        };

        self.loadData = function (data) {
            var tab = self.tabs()[data.id - 1];
            tab.isSelected(true);
            self.selectedTab(tab);
           
            self.templateData(new templateModel(data.id, getModel(data.id, data)));
        }

        self.chosenData = ko.pureComputed(function () {
            //console.log(self.templateData().data.toJS());
            //return !self.templateData() ?
            //    ko.toJSON({}) :
            //    ko.toJSON({
            //        type: self.templateData().key,
            //        data: self.templateData().data.toJS()
            //    });

            return !self.templateData() ?
                {} :
                {
                    type: self.templateData().key,
                    data: self.templateData().data.toJS()
                };

        }, self);

        if (!data) {
            self.loadData({ id: 1 });
        }
        else {
            self.loadData(data);
        }
    }

    return { CronModel: cv };
})();

$(function () {
    function getWidgitData() {
        /*
            { id: 1, interval: 30 } //minute
            { id: 3, isRecurring: "1", minute: 0, hour: 0, interval: 5 } //daily
            { id: 4,  minute: 20, hour: 20, days: [1,2,5] } //weekly
        */
        return {
            id: 6, isRecurring: "1", day: 12, month: 4, nday: 2, nweek: 2, nmonth: 4, hour: 4,
            minute: 8
        };
    }

    var model = function () {
        var self = this;
        self.widgetModel = new cron.CronModel(getWidgitData());        
    }

    var vm = new model();
    ko.applyBindings(vm);
});