from flask import Flask
import wolframalpha as wf

app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return 'Caesium'


@app.route('/wolframalpha/<query>/<key>')
def wolframalpha(query, key):
    print("s")
    print(query, key)
    app_id = key
    client = wf.Client(app_id)
    try:
        res = client.query(query)
        answer = next(res.results).text
        return answer
    except Exception as e:
        return e
