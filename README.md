# Unwound

## Inspiration
Inspiration to base our application around wounds stemmed from our friend, Eugene. When he got a small wound on his hip, he made an appointment with his doctor. However, it was a whole week away. In the meantime, he had to figure out how to care for his injury himself. With no clue of what his wound even was, he turned to dozens of Google results to finally learn how to treat it. The whole process was time-consuming and he was sure he could make it simpler.
Incorporating AI and machine learning we set out to build that solution. 

## What it does
Our application comes into play in the case of an accident. When someone gets hurt, they can use our app to quickly figure out the best course of action. Whether it is a minor scrape or a puncture wound, our program will be able to offer advice. 

## How we built it
Our application blends React Native and Gifted Chat to display its straightforward and familiar user interface. Langchain provides us with methods to embed our data and provide the most relevant information to the LLM. Google Gemini powers our program’s chat interaction with the user. 

## Challenges we ran into
Our intended database did not allow us to collaborate across devices and was inconsistent when creating our tables.
React Native gave us issues when our project had issues bundling. 
When interacting with the LLM there were issues with importing the required functions.
Our object detection model was not compatible when we were trying to deploy it on mobile devices so we opted to use Onnx instead.

## Accomplishments that we're proud of
Creating a functional version of our project idea. 

## We learned how to
Utilize RAG to generate responses from custom data.
Use React Native to capture images and upload them to a server.
Use YOLOv5 to detect multiple objects in an image

## What's next for Unwound
We plan to make this object detention model run offline, so that users have access even when there is no internet connection. The current model can be polished by filtering the data being embedded. This is to ensure the information is accurate. At the same time, we want to add additional data so that the app can recognize and provide information for a larger scope of injuries.
