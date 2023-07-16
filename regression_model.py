import pickle
import pandas as pd
import json
import sys


def main():
    # Load the linear regression model
    with open('transaction_model.pkl', 'rb') as file:
        model = pickle.load(file)


    # Get input data from command line arguments
    input_data = sys.argv[1]

    # Parse the input data as JSON
    try:
        input_data = json.loads(input_data)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON input: {e}")
        sys.exit(1)

    dp = pd.DataFrame(input_data)

    # Perform prediction using the loaded model
    prediction = model.predict(dp)

    # Print the prediction
    print(prediction)

    return prediction

if __name__=='__main__':
    main()
