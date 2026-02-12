"use server";

export async function sendContactEmail(prevState: any, formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Validation
    if (!name || !email || !message) {
        return { success: false, message: "Please fill out all fields." };
    }

    // Here you would integrate Resend, Nodemailer, etc.
    // console.log("Sending email...", { name, email, message });

    return { success: true, message: "Message sent! I'll get back to you soon." };
}
