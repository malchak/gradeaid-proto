App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Student = DS.Model.extend({
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	assignments: DS.attr('string'),
	fullName: (function(){
		return this.get('firstName') + " " + this.get('lastName');
	}).property('firstName', 'lastName')
});

App.Student.FIXTURES = [
	{
		id: 1,
		firstName: 'Harry',
		lastName: 'Potter',
		assignments: [
			{
				id: 1,
				subject: 'Math',
				type: 'Quiz',
				title: 'Take Home Test',
				points: 5,
				outOf: 10
			}
		]
	},
	{
		id: 2,
		firstName: 'Ronald',
		lastName: 'Weesley'
	}
]

App.Router.map(function() {
  this.resource('students', function(){
  	this.resource('student', {path: '/:student_id'}, function(){
  	});
  });
  this.resource('assignments');
});

App.StudentsRoute = Ember.Route.extend({
	model: function(){
		return this.store.find('student');
	}
});

App.StudentIndexRoute = Ember.Route.extend({
	model: function(params){
		return App.Student.find(params.student_id);
	}
});


App.StudentsController = Ember.ArrayController.extend({
	actions: {
		createStudent: function(){
			var firstName = this.get('firstName');
			var lastName = this.get('lastName');
			if (!firstName.trim()){return;}
			
			student = this.store.createRecord('student', {
				firstName: firstName,
				lastName: lastName
			});
			
			this.set('firstName', '');
			this.set('lastName', '');
		}
	}
});

App.StudentController = Ember.ObjectController.extend({
	actions: {
		removeStudent: function(){
			var student = this.get('model');
			student.deleteRecord();
			student.save();
		}
	}
});






