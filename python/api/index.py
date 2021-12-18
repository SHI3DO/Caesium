from flask import Flask
import wolframalpha as wf

app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return 'Caesium'


@app.route('/wolframalpha/<key>/<query>')
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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
