source 'https://rubygems.org'

# Jekyll core
gem "jekyll", "~> 4.4"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-github-metadata", "~> 2.16"
end

# Markdown processing
gem "kramdown-parser-gfm", "~> 1.1"

# For WSL/Linux (required for Jekyll 4+)
gem 'webrick', '~> 1.7'

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
