var expect = chai.expect;
var should = chai.should();

var myapi = {
    getList: function(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://listalous.herokuapp.com/lists/kmcelveen', true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    callback(null, JSON.parse(xhr.responseText));
                }
                else {
                    callback(xhr.status);
                }
            }
        };

        xhr.send();
    },

    createTodo: function(data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://listalous.herokuapp.com/lists/kmcelveen/items', true);

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                callback();
            }
        };

        xhr.send(JSON.stringify(data));
    }
};

describe('MyAPI', function() {
    beforeEach(function() {
        this.xhr = sinon.fakeServer.create();
        this.requests = [];
        this.xhr.onCreate = function(xhr) {
            this.requests.push(xhr);
        }.bind(this);
    });

    afterEach(function() {
        this.xhr.restore();
    });

    it('should parse fetched data as JSON', function(done) {
        var data = { foo: 'bar' };
        var dataJson = JSON.stringify(data);

        myapi.getList(function(err, result) {
            result.should.deep.equal(data);
            done();
        });

        this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
    });

    it('should send given data as JSON body', function() {
        var data = { hello: 'world' };
        var dataJson = JSON.stringify(data);

        myapi.createTodo(data, function() { });

        this.requests[0].requestBody.should.equal(dataJson);
    });

    it('should return error into callback', function(done) {
        myapi.getList(function(err, result) {
            err.should.exist;
            done();
        });

        this.requests[0].respond(500);
    });
});



describe('create new item', function() {
  it('should request items from server', function() {
    expect(document.getElementById('list')).to.not.equal('null')
  }); 


  it('should correctly store input string', function() {

    var userInput = document.getElementById('list')
    expect(userInput).to.not.be.a('string');
  });

  it('List should have description property', function() {
    var userInput = {description: 'mop floor', completed: true};
    expect(userInput).to.have.property('description');
  });
});


describe('deleteTask', function() {

  it ('Task should be available to remove from master list', function() {
    expect(document.getElementsByTagName('list')).to.exist;
  });

  it ('should remove selected task', function() {
    expect();
  });

});

