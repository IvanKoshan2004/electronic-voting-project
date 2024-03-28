export function createApiResponse(payload, error) {
  return {
    success: !error,
    ...payload,
  };
}
