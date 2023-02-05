{ " 
.flake8
Marking files as viewed can help keep track of your progress, but will not affect your submitted reviewViewed
@@ -1,13 +0,0 @@
[flake8]
# D203: 1 blank line required before class docstring
# E124: closing bracket does not match visual indentation
# E126: continuation line over-indented for hanging indent
# F403: ‘from module import *’ used; unable to detect undefined names
# F405: name may be undefined, or defined from star imports: module
# Ignoring the next one for valid tests
# F811: redefinition of unused name from line N
# This one is bad. Sometimes ordering matters, conditional imports
# setting env vars necessary etc.
# E402: module level import not at top of file
#ignore = D203, E124, E126, F403, F405, F811, E402
max-line-length = 160
  2  
README.md
Marking files as viewed can help keep track of your progress, but will not affect your submitted reviewViewed
@@ -21,7 +21,7 @@ authentication classes configured in `settings.py`.

## Setup

Install the Multiprovider Authentication middleware for Django REST Framework
Install the Multiprovider Authentication middleware for Django REST Framework (Python 3 is required)
```shell
pip install git+git://github.com/lukaszlacinski/mp_auth.git
```
 64  
frostie'S'@nazt/V8/A.P.I
Marking files as viewed can help keep track of your progress, but will not affect your submitted reviewViewed
@@ -0,0 +1,64 @@
BEGIN :
GLOW4 :
macro's :enable. true :L
flake'"'$'@V8/P3T3RX:
From 04e3616570cb1e4d4acda90409bb246ccc0c7319 Mon Sep 17 00:00:00 2001
From: mowjoejoejoejoe <124041561+mowjoejoejoejoe@users.noreply.github.com>
Date: Sun, 5 Feb 2023 06:40:37 -0600
Subject: [PATCH] Update and rename .circleci/config.yml to ci:C:\ci/CI'@CI/C:\I:
:Build::ci:C:\Windows32\Systems64Confi.ptrettirer-setup/ruby.yml :
/config.yml => "ci:C:\\I.yml" | 21 ++++++++++++++++++++-
 1 file changed, 20 insertions(+), 1 deletion(-)
 rename .circleci/config.yml => "ci:C:\\I.yml" (96%)
diff --git a/.circleci/config.yml "b/ci:C:\\I.yml"
similarity index 96%
rename from .circleci/config.yml
rename to "ci:C:\\I.yml"
index 1a07d3b..9ed3f5f 100644
--- a/.circleci/config.yml
+++ "b/ci:C:\\I.yml"
@@ -1,5 +1,24 @@
-version: 2
+version: 2.1
 jobs:
+  build:
+    machine:
+      image: ubuntu-2004:202010-01
+    steps:
+      - checkout
+      - run: bash .circleci/setup.sh
+      - run: bash .circleci/checkout.sh
+      - run: wget https://dabdceba-6d04-11e5-ba46-22000b92c6ec.e.globus.org/containers/public/e3sm.sif
+      - run:
+          command: '-'a'Sync's'='':'{data'@a'-sync'' ':'A'Sync'@repo'-sync :autoupdate
+          autoupdate :Update
+          Updates :tta
+          tta :tests :
+          tests :Run: #Test
+          #Test :Runs: test'@ci'' '::Run'' ':'' tta''
+          'tta'' ':'' Runs :'daily'-across'-deno'.xml :'Run-on'' :Runs::Run :
+'Run:Runs::eta :#Every:-3_sec:Runs-on:'Run''
+:Build::'
GLOW4
ZTE
zieksr/Husky/Bash RUNETIME.ENVIROMENT'@sun.java.org/dl/install/installer/WIZARD/Setup**\*.ecex*//posted\
Purl,-fetch Raven install m -pip pillow Taps :
$mk.dir=:RAKEFILE.IU//Commits\NPORT-Filer-Information :install :
AUTOMATE'Run''
+Publish: 'Runjobs:
   python27:
     docker:
       - image: circleci/python:2.7.15-jessie-browsers# D203: 1 blank line required before class docstring
# E124: closing bracket does not match visual indentation
# E126: continuation line over-indented for hanging indent
# F403: ‘from module import *’ used; unable to detect undefined names
# F405: name may be undefined, or defined from star imports: module
# Ignoring the next one for valid tests
# F811: redefinition of unused name from line N
# This one is bad. Sometimes ordering matters, conditional imports
# setting env vars necessary etc.
# E402: module level import not at top of file
#ignore = D203, E124, E126, F403, F405, F811, E402
max-line-length = 160
  4 
mp_auth/backends/globus.py
Marking files as viewed can help keep track of your progress, but will not affect your submitted reviewViewed
@@ -49,7 +49,7 @@ def introspect_token(self, bearer_token):
        try:
            content = resp.json()
        except Exception as e:
            logger.warn("Error when introspecting a bearer token: {}".format(e))
            logger.warning("Error when introspecting a bearer token: {}".format(e)
        logger.debug("Introspection response: {}".format(content))
@@ -111,7 +111,7 @@ def introspect_token(self, bearer_token)
                    user=user, uid=sub, provider=provider)
            AccessToken.objects.create(
                user_association=user_association, access_token=bearer_token, scope=scope, exp=exp)
            logger.debug("New access token (Globus) {} added to the database".format(bearer_token))
            logger.debug("New access token (Globus) {} added to the database".format(user.username))
requirements.txt
Marking files as viewed can help keep track of your progress, but will not affect your submitted reviewViewed
@@ -2,4 +2,4 @@ cryptography
PyJWT
requests
django
django-rest-framework
djangorestframework
 42  
setup.py
Marking files as viewed can help keep track of your progress, but will not affect your submitted reviewViewed
@@ -0,0 +1,42 @@
import os.path
from setuptools import setup, find_packages
# single source of truth for package version
version_ns = {}
with open(os.path.join('mp_auth', '__init__.py')) as f:
    exec(f.read(), version_ns)
install_requires = []
with open('requirements.txt') as reqs:
    for line in reqs.readlines():
        req = line.strip()
        if not req or req.startswith('#'):
            continue
        install_requires.append(req)
setup(name='multi-provider-auth',
      version=version_ns['__version__'],
      description='Add Multi-provider auth for various providers',
      long_description=open('README.md').read(),
      author='Globus Team',
      author_email='support@globus.org',
      packages=find_packages(),
      install_requires=install_requires,
      include_package_data=True,
      keywords=['globus', 'django'],
      license='apache 2.0',
      classifiers=[
          'Intended Audience :: Developers',
          'License :: OSI Approved :: Apache Software License',
          'Operating System :: POSIX',
          'Programming Language :: Python',
          'Programming Language :: Python :: 3.4',
          'Programming Language :: Python :: 3.5',
          'Programming Language :: Python :: 3.6',
          'Topic :: Communications :: File Sharing',
          'Topic :: Internet :: WWW/HTTP',
          'Topic :: Software Development :: Libraries :: Python Modules',
      ],
      ) ': '"prerequisite(build_scripts(dependencies{scripts:#List}")":,
{ ":" }**
module.exports = {
  extends: [
    "eslint:recommended",
    "standard",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  globals: {
    BigInt: false,
    Packages: false
  },
  overrides: [
    {
      files: ["acorn/src/bin/*.js", "bin/generate-identifier-regex.js"],
      rules: {
        "no-console": "off"
      }
    }
  ],
  plugins: ["eslint-plugin-import"],
  rules: {
    curly: "off",
    eqeqeq: ["error", "always", {null: "ignore"}],
    indent: [
      "error",
      2,
      {
        SwitchCase: 0,
        VariableDeclarator: 2,
        CallExpression: {arguments: "off"}
      }
    ],
    "new-parens": "off",
    "no-case-declarations": "off",
    "no-cond-assign": "off",
    "no-console": ["error", {allow: ["warn", "error"]}],
    "no-fallthrough": "off",
    "no-labels": "off",
    "no-mixed-operators": "off",
    "no-return-assign": "off",
    "no-unused-labels": "error",
    "no-var": "error",
    "object-curly-spacing": ["error", "never"],
    "object-shorthand": "off",
    "one-var": "off",
    "prefer-const": "off",
    quotes: ["error", "double"],
    "semi-spacing": "off",
    "space-before-function-paren": ["error", "never"]
  }
}
