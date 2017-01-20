import json

if __name__ == '__main__':
	f = open('nudges.txt', 'r')
	lines = f.readlines()
	f.close()

	result = {}
	current_day = 0
	current_level = ""
	current_msg = ""

	for line in lines:
		if line[0:3] == "DAY":
			if current_day in result:
				result[current_day][current_level] = current_msg
			else:
				result[current_day] = {}
				result[current_day][current_level] = current_msg
			current_day = 0
			current_level = ""
			current_msg = ""

			words = line.split()
			if len(words) != 4:
				continue
			current_day = int(words[1])
			current_level = words[2]
		else:
			if not current_day:
				continue
			current_msg = current_msg + line

	with open('nudges.json', "w") as f:
		f.write(json.dumps(result, sort_keys=True, indent=4, separators=(',', ': ')))
		f.write("\n")

