#!/usr/local/bin/python
# -*- coding: utf-8 -*-

import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from pprint import pprint
from mlask import MLAsk
import json

def main():
    targets = ['kinoko', 'takenoko']

    for target in targets:     
        fp = open('./src/data/%sRecentSearch.json' % target)
        search_result = json.load(fp)
        fp.close()
        summary = analyzeDatabyMLAsk(search_result)
        pprint(summary)

        fp = open('./src/data/%sEmotion.json' % target, 'w')
        json.dump(summary, fp)
        fp.close

def analyzeDatabyMLAsk (search_result):
    summary = {
        'orientation':{},
        'intension': {},
        'representative': {}
    }
    emotion_analyzer = MLAsk()

    for node in search_result['data']:
        r = emotion_analyzer.analyze(node['text'])
        if 'orientation' in r:
            if r['orientation'] in summary['orientation']:
                summary['orientation'][r['orientation']] += 1
            else:
                summary['orientation'][r['orientation']] = 1

        if 'intension' in r:
            if r['intension'] in summary['intension']:
                summary['intension'][r['intension']] += 1
            else:
                summary['intension'][r['intension']] = 1

        if 'representative' in r:
            if r['representative'][0] in summary['representative']:
                summary['representative'][r['representative'][0]] += 1
            else:
                summary['representative'][r['representative'][0]] = 1
    return summary

if __name__ == "__main__":
    main()