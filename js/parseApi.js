Parse.initialize("GdphsZ82nRcNe4SWgr7n2Q1izTGhbip8zQYVjNM6", "PTEORK6w2ImcqU45hqPdA3eYE8LE6O6AXcjY8yA0");

var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}, {
  success: function(object) {
    console.log("yay! it worked");
  }
});
