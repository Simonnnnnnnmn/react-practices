from openai import OpenAI

client = OpenAI(api_key="sk-c24d6df85648422db6652ce6a0ce6601", base_url="https://api.deepseek.com")

response = client.responses.create(
    model="deepseek-flash",
    instructions="You are a helpful assistant.",
    input="Hi, how are you?",
)

print(response.output_text)
