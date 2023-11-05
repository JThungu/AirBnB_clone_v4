#!/usr/bin/python3
"""script that starts a Flask web applicatione"""
from flask import Flask, render_template, url_for
from models import storage
from uuid import uuid4

# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


# begin flask page rendering
@app.teardown_appcontext
def teardown_db(exception):
    """query string to each asset value of this variable must be an UUID"""
    storage.close()


@app.route('/2-hbnb')
def hbnb_filters(the_id=None):
    """handles request to hbnb custom template"""
    cache_id = uuid4()
    state_objs = storage.all('State').values()
    states = dict([state.name, state] for state in state_objs)
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    return render_template('2-hbnb.html',
                           states=states,
                           amens=amens,
                           places=places,
                           users=users,
                           cache_id=cache_id)

if __name__ == "__main__":
    """Flask App"""
    app.run(host=host, port=port)
