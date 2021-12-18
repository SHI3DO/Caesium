from flask import Flask, request
import wolframalpha as wf


app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return 'Caesium'


@app.route('/wolframalpha/<key>')
def wolframalpha(key):
    query = request.args.get('query')
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
