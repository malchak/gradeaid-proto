App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Student = DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	fullName: function(){
		return this.get('firstName') + " " + this.get('lastName');
	}
});

App.Student.FIXTURES = [
	{
		id: 1,
		firstName: 'Harry',
		lastName: 'Potter'
	},
	{
		id: 2,
		firstName: 'Ronald',
		lastName: 'Weesley'
	}
]

App.Router.map(function() {
  this.resource('students');
});

App.StudentsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('student');
	}
})