source 'https://rubygems.org'

# Jekyll core
gem "jekyll", "~> 4.4"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-github-metadata", "~> 2.16"
  gem "faraday-retry", "~> 2.2"
end

# Markdown processing
gem "kramdown-parser-gfm", "~> 1.1"

# For WSL/Linux (required for Jekyll 4+)
gem 'webrick', '~> 1.7'

# Windows and JRuby compatibility
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
