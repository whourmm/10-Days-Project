export default async function getBlogs() {
  // add timeout
  await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`);
    if (!response.ok) {
      console.log(response);

      throw new Error("Failed to fetch blogs");
    }
    console.log(response);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
