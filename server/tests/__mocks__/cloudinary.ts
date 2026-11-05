// __mocks__/cloudinary.ts
// Each upload gets a unique URL so tests can tell uploads apart
let uploadCount = 0;

const uploadStreamMock = jest.fn((_options, callback) => {
  const stream = {
    end: jest.fn((buffer) => {
      const n = ++uploadCount;
      setImmediate(() => {
        callback(null, {
          secure_url: `https://res.cloudinary.com/test/image/upload/test-${n}.jpg`,
          public_id: `recipes/test-${n}`,
        });
      });
    }),
    on: jest.fn().mockReturnThis(),
    write: jest.fn(),
  };

  return stream;
});

const v2 = {
  uploader: {
    upload_stream: uploadStreamMock,
  },
  config: jest.fn(),
};

export { v2 };
export default { v2 };
