#!/usr/local/bin/python
# -*- coding: utf-8 -*-

import sys
# sysモジュールをリロードする
reload(sys)
# デフォルトの文字コードを変更する．
sys.setdefaultencoding('utf-8')

from pprint import pprint

from mlask import MLAsk
emotion_analyzer = MLAsk()
r = emotion_analyzer.analyze("彼のことは嫌いではない！(;´Д`)")

pprint(r) 