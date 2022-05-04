/* Cron widgit library*/
var cron = (function () {
    //var shouter = new ko.subscribable();
    //var token = "messageToken";

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

 
    var weekModel = function (day, hour, minute, ampm) {
        this.days = days;
        this.day = ko.observable(day || 'Sunday');
        this.dayModel = ko.observable(new dayModel(hour, minute, ampm));
    }

    var monthModel = function (day, hour, minute, ampm) {
        this.days = ko.utils.range(1, 31);
        this.day = ko.observable(day || 1);
        this.dayModel = ko.observable(new dayModel(hour, minute, ampm));
    }

    var yearModel = function (month, day, hour, minute, ampm) {
        this.months = months;
        this.month = ko.observable(month || 'Jan');
        this.days = ko.utils.range(1, 31);
        this.day = ko.observable(day || 1);
        this.dayModel = ko.observable(new dayModel(hour, minute, ampm));
    }

    var templateModel = function (key, template, data) {
        this.key = key;
        this.template = ko.observable(template);
        this.data = data;
    };

    var option = function (id, name) {
        this.id = id;
        this.name = name;
    };

    var options = [
        new option(1, "Week"),
        new option(2, "Month"),
        new option(3, "Year")
    ];

    var templates = {
        1: new templateModel('week', 'Week', new weekModel()),
        2: new templateModel('month', 'Month', new monthModel()),
        3: new templateModel('year', 'Year', new yearModel())
    };

    var viewModel = function () {

        var self = this;
        self.templates = templates;
        self.availableOptions = ko.observableArray(options);
        self.selectedOption = ko.observable();

        self.templateData = ko.observable();

        self.selectedOption.subscribe(function () {
            self.templateData(self.templates[self.selectedOption().id]);
        });

        var notifier = new ko.subscribable();
        var token = "messageToken";

        self.loadData = function (data) {
            if (!data) return;

            var templateData = {
                'week': { type: 1, data: new templateModel('week', 'Week', new weekModel(data.day, data.hour, data.minute, data.ampm)) },
                'month': { type: 2, data: new templateModel('month', 'Month', new monthModel(data.day, data.hour, data.minute, data.ampm)) },
                'year': { type: 3, data: new templateModel('year', 'Year', new yearModel(data.month, data.day, data.hour, data.minute, data.ampm)) }
            };

            var type = templateData[data.type].type;
            var x = templateData[data.type].data;
            self.selectedOption(options[type]);
            self.templateData(x);
            notifier.notifySubscribers(self.templateData(), token);
        }

        self.notify = function() {
            notifier.notifySubscribers(self.templateData(), token);            
        }

        self.templateData.subscribe(function(newValue) {
            notifier.notifySubscribers(newValue, token);
        });

        self.subscribeToChange = function(arg) {
            notifier.subscribe(function (data) {
                arg(data);
            }, self, token);
            return self;
        }
    };

    return { CronViewModel: viewModel };
})();