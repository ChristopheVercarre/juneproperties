class ApplicationController < ActionController::Base
  extend Trickster

  tricks HasTheme

  theme :inloco
end
