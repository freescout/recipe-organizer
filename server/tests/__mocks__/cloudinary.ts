// __mocks__/cloudinary.ts
const uploadStreamMock = jest.fn((_options, callback) => {
  const stream = {
    end: jest.fn((buffer) => {
      setImmediate(() => {
        callback(null, {
          secure_url: "https://res.cloudinary.com/test/image/upload/test.jpg",
          public_id: "recipes/test",
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
