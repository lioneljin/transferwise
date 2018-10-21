import json
import random

def proc_cluster(cluster, group):
    cities = [cluster[0]]
    edges = []
    stacks = [[cluster[0]]]
    i = 1
    while i < len(cluster) - 1:
        stack = min(len(cluster) - i, random.randint(1, max(len(cluster) // 2 - i, 1)))
        stacks.append(cluster[i: min(len(cluster), i + stack)])
        i += stack

    for j, st in enumerate(stacks[:-1]):
        for k in stacks[j + 1]:
            cities.append(k)
        for c in stacks[j + 1]:
            tmp = random.choice(st)
            edges.append({'coords': [
                    [tmp['lat'], tmp.get('lng', tmp.get('lon'))],
                    [c['lat'], c.get('lng', c.get('lon'))]
                ],
                'source': tmp['cid'],
                'target': c['cid'],
                'group': group
            })
    return (cities, edges)


from copy import deepcopy


def generate_clusters(num, data):
    clusters = []
    d = deepcopy(data)
    for i in range(num):
        random.shuffle(d)
        cluster = d[:random.randint(5, len(d) // 4)]
        d = d[random.randint(0, len(cluster)):]
        clusters.append(cluster)
    return clusters


cities_big = json.loads(open('front/data/dcities.json').read())


clusters = generate_clusters(5, cities_big)

links = []
cities = []

for i, cl in enumerate(clusters):
    c, l = proc_cluster(cl, i)
    cities = cities + c
    links = links + l

with open('front/data/rul.json', 'w') as f:
    f.write(json.dumps(links))

with open('front/data/ruc.json', 'w') as f:
    f.write(json.dumps(cities))
