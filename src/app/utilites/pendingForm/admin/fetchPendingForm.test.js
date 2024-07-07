const fetchPendingForm = require('./fetchPendingForm')

test('Get a list of pending form for admin', () => {
  expect(fetchPendingForm()).toEqual([
    {
        id: 1,
        formSubmitter: "Mg Mg",
        status: "Pending"
    }
  ])
});