import os
from azure.core.exceptions import ResourceNotFoundError
from azure.ai.formrecognizer import FormRecognizerClient
from azure.ai.formrecognizer import FormTrainingClient
from azure.core.credentials import AzureKeyCredential

def main(): 
        
    try: 
    
        # Get configuration settings 
        form_endpoint = "https://doors1.cognitiveservices.azure.com/"
        form_key = "70b2796924584d8da912296e8dea613a"
        trainingDataUrl = "https://doors.blob.core.windows.net/treinamento?sp=racwdl&st=2021-05-27T23:44:21Z&se=2021-08-02T07:44:21Z&sv=2020-02-10&sr=c&sig=9Tq5HVWS6Fzq5mHIIklZk3Z1wO%2B5junlwtlNTIFP194%3D"

        # Authenticate Form Training Client
        form_recognizer_client = FormRecognizerClient(form_endpoint, AzureKeyCredential(form_key))
        form_training_client = FormTrainingClient(form_endpoint, AzureKeyCredential(form_key))

        # Train model 
        poller = form_training_client.begin_training(trainingDataUrl, use_training_labels=False)
        model = poller.result()

        print("Model ID: {}".format(model.model_id))
        print("Status: {}".format(model.status))
        print("Training started on: {}".format(model.training_started_on))
        print("Training completed on: {}".format(model.training_completed_on))

    except Exception as ex:
        print(ex)

if __name__ == '__main__': 
    main()